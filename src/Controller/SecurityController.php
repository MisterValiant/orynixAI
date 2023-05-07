<?php

namespace App\Controller;

use App\Entity\User;
use DateTime;
use Doctrine\Persistence\ManagerRegistry;
use Exception;
use Gesdinet\JWTRefreshTokenBundle\Generator\RefreshTokenGeneratorInterface;
use Gesdinet\JWTRefreshTokenBundle\Model\RefreshTokenManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTExpiredEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\JWTDecodeFailureException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Serializer\Encoder\JsonEncode;

#[Route('/api', name: 'app_security')]
class SecurityController extends AbstractController
{

    // Refresh token constructor
    public $refreshTokenGenerator, $refreshTokenManager, $JWTManager, $JWTEncoder, $tokenStorageInterface, $doctrine;
    public function __construct(
        RefreshTokenGeneratorInterface $refreshTokenGenerator,
        RefreshTokenManagerInterface $refreshTokenManager,
        TokenStorageInterface $tokenStorageInterface,
        JWTTokenManagerInterface $jwtManager,
        ManagerRegistry $doctrine,
        JWTEncoderInterface $jwtEncoder
    ) {
        $this->refreshTokenGenerator = $refreshTokenGenerator;
        $this->refreshTokenManager = $refreshTokenManager;
        $this->JWTManager = $jwtManager;
        $this->tokenStorageInterface = $tokenStorageInterface;
        $this->doctrine = $doctrine;
        $this->JWTEncoder = $jwtEncoder;
    }

    // Authorisation
    #[Route(path: '/auth/token', name: 'api_auth_token', methods: ['POST'])]
    public function access_token(Request $request): Response
    {
        // Read request and json decode
        $jsonData = json_decode($request->getContent(), true);

        // initialise
        $message = 'No message from server';
        $data = 'No data returned from server';
        $response = new JsonResponse();
        $response->headers->set('Content-Type', 'application/json');

        // Get Token from Http request

        $refreshTokenCookie = $request->cookies->get('refresh_token');
        $refreshToken = $this->refreshTokenManager->get($refreshTokenCookie);

        // Check on refresh token
        if ($refreshToken == null) {
            // not found
            $host = Request::createFromGlobals();
            $host = $host->getHost();

            // remove refresh token from cookie
            $cookie = new Cookie(
                "refresh_token",                          // Cookie name
                'expired',                                       // Cookie content
                (new DateTime('now'))->modify("-2592000 second"), // Expiration date
                "/",                                     // Path
                $host,                             // Domain
                $request->getScheme() === 'https',       // Secure
                true,                                   // HttpOnly
                true,                                    // Raw
                'Strict'                                 // SameSite policy
            );

            $response->headers->setCookie($cookie);
            $response->setStatusCode(400);
            $message = 'Invalid authentication token!';
        } else {
            // found

            // check if expired in database
            if ($refreshToken->getValid() < new DateTime) {
                $this->refreshTokenManager->delete($refreshToken);
                $message = 'Refresh token has expired!';
                $response->setStatusCode(403);
            } else {

                // check on access token
                try {
                    $accessTokenBearer =  $jsonData['data']['Authorization'];
                    try {
                        // decode and check validity
                        $this->JWTEncoder->decode(str_replace("Bearer", "", trim(str_replace("Bearer", "", $accessTokenBearer))));

                        // If valid; check if access token corresponds to the user in the refresh token
                        $accessToken = $this->JWTManager->parse(str_replace("Bearer", "", trim(str_replace("Bearer", "", $accessTokenBearer))));
                        $user = $this->doctrine->getRepository(User::class)->findOneBy(['username' => $refreshToken->getUsername()]);

                        if ($user != null) {
                            if ($accessToken['username'] != $user->getUsername()) {
                                // access token does not match with refresh token
                                // revoke all access
                                $this->refreshTokenManager->delete($refreshToken);

                                // remove refresh token from cookie
                                $host = Request::createFromGlobals();
                                $host = $host->getHost();

                                $cookie = new Cookie(
                                    "refresh_token",                          // Cookie name
                                    'expired',                                       // Cookie content
                                    (new DateTime('now'))->modify("-2592000 second"), // Expiration date
                                    "/",                                     // Path
                                    $host,                             // Domain
                                    $request->getScheme() === 'https',       // Secure
                                    true,                                   // HttpOnly
                                    true,                                    // Raw
                                    'Strict'                                 // SameSite policy
                                );

                                $response->headers->setCookie($cookie);
                                $message = 'Authentication tokens have been compromised';
                                $response->setStatusCode(403);
                            } else {
                                // valid
                                $data = array(
                                    'roles' => $user->getRoles()
                                );
                                
                                $message = 'Access token is still valid';
                                $response->setStatusCode(200);
                            }
                        } else {
                            $this->refreshTokenManager->delete($refreshToken);

                            // remove refresh token from cookie
                            $host = Request::createFromGlobals();
                            $host = $host->getHost();

                            $cookie = new Cookie(
                                "refresh_token",                          // Cookie name
                                'expired',                                       // Cookie content
                                (new DateTime('now'))->modify("-2592000 second"), // Expiration date
                                "/",                                     // Path
                                $host,                             // Domain
                                $request->getScheme() === 'https',       // Secure
                                true,                                   // HttpOnly
                                true,                                    // Raw
                                'Strict'                                 // SameSite policy
                            );

                            $response->headers->setCookie($cookie);
                            $message = 'Authentication tokens have been revoked!';
                            $response->setStatusCode(403);
                        }
                    } catch (JWTDecodeFailureException $ex) {
                        // access token expired

                        $user = $this->doctrine->getRepository(User::class)->findOneBy(['id' => $refreshToken->getUsername()]);
                        // $response->setContent(json_encode(array('message' => $user->getId()])));
                        // return $response;


                        // Generate Access Token
                        $JWTToken = $this->JWTManager->create($user);
                        $data = array(
                            'roles' => $user->getRoles(),
                            'token' => $JWTToken
                        );

                        // creating new refresh token
                        // delete old one
                        $this->refreshTokenManager->delete($refreshToken);

                        $newRefreshToken = $this->refreshTokenGenerator->createForUserWithTtl($user, 2592000);
                        $this->refreshTokenManager->save($newRefreshToken);
                        $refreshTokenString = $newRefreshToken->getRefreshToken();

                        $host = Request::createFromGlobals();
                        $host = $host->getHost();

                        $cookie = new Cookie(
                            "refresh_token",                          // Cookie name
                            $refreshTokenString,                                       // Cookie content
                            (new DateTime('now'))->modify("+2592000 second"), // Expiration date
                            "/",                                     // Path
                            $host,                             // Domain
                            $request->getScheme() === 'https',       // Secure
                            true,                                   // HttpOnly
                            true,                                    // Raw
                            'Strict'                                 // SameSite policy
                        );
                        // new refresh token created

                        $response->headers->setCookie($cookie);
                        $response->headers->set('Authorization', 'Bearer ' . $JWTToken);
                        $message = 'Access token expired! New access token created';
                        $response->setStatusCode(200);
                    }
                } catch (Exception $e) {
                    // access token not found in header
                    // create a new refresh token from current user
                    $user = $this->doctrine->getRepository(User::class)->findOneBy(['id' => $refreshToken->getUsername()]);

                    // delete old one
                    $this->refreshTokenManager->delete($refreshToken);

                    $newRefreshToken = $this->refreshTokenGenerator->createForUserWithTtl($user, 2592000);
                    $this->refreshTokenManager->save($newRefreshToken);
                    $refreshTokenString = $newRefreshToken->getRefreshToken();

                    $host = Request::createFromGlobals();
                    $host = $host->getHost();

                    $cookie = new Cookie(
                        "refresh_token",                          // Cookie name
                        $refreshTokenString,                                       // Cookie content
                        (new DateTime('now'))->modify("+2592000 second"), // Expiration date
                        "/",                                     // Path
                        $host,                             // Domain
                        $request->getScheme() === 'https',       // Secure
                        true,                                   // HttpOnly
                        true,                                    // Raw
                        'Strict'                                 // SameSite policy
                    );
                    // new refresh token created

                    // Generate Access Token
                    $JWTToken = $this->JWTManager->create($user);
                    $data = array(
                        'roles' => $user->getRoles(),
                        'token' => $JWTToken
                    );

                    $response->headers->setCookie($cookie);
                    $response->headers->set('Authorization', 'Bearer ' . $JWTToken);
                    $message = 'Bearer not found. New access token created!';
                    $response->setStatusCode(200);
                }
            }
        };


        $response->setContent(json_encode(array('message' => $message, 'data' => $data)));
        return $response;
    }

    // User login
    #[Route(path: '/auth/login', name: 'api_auth_login', methods: ['POST'])]
    public function user_login(Request $request, UserPasswordHasherInterface $passwordHasher): Response
    {
        // Read request and json decode
        $jsonData = json_decode($request->getContent(), true);

        // initialise
        $response = new JsonResponse();
        $response->headers->set('Content-Type', 'application/json');
        $message = '';
        $valid = true;
        $user = '';
        $data = '';
        // Refresh Token cookie from Http request
        $refreshTokenCookie = $request->cookies->get('refresh_token');

        // check for valid json format
        try {
            $jsonData['data'];
            $jsonData['data']['username'];
            $jsonData['data']['password'];

            // check for valid credentials from db
            $user = $this->doctrine->getRepository(User::class)->findOneBy(['username' => $jsonData['data']['username']]);

            if ($user != null) {
                if (!$passwordHasher->isPasswordValid($user, $jsonData['data']['password'])) {
                    $valid = false;
                    $response->setStatusCode(400);
                    $message = 'Invalid credentials';
                }
            } else {
                $valid = false;
                $response->setStatusCode(400);
                $message = 'Invalid credentials';
            }
        } catch (Exception $e) {
            $valid = false;
            $response->setStatusCode(400);
            $message = 'Invalid request';
        }

        // if json and credentials valid
        if ($valid == true) {

            if ($refreshTokenCookie == null) {

                // Generate tokens
                // create refresh token
                $refreshToken = $this->refreshTokenGenerator->createForUserWithTtl($user, 2592000);
                $this->refreshTokenManager->save($refreshToken);
                $refreshTokenString = $refreshToken->getRefreshToken();

                $host = Request::createFromGlobals();
                $host = $host->getHost();

                $cookie = new Cookie(
                    "refresh_token",                          // Cookie name
                    $refreshTokenString,                                       // Cookie content
                    (new DateTime('now'))->modify("+2592000 second"), // Expiration date
                    "/",                                     // Path
                    $host,                             // Domain
                    $request->getScheme() === 'https',       // Secure
                    true,                                   // HttpOnly
                    true,                                    // Raw
                    'Strict'                                 // SameSite policy
                );

                // Generate Access Token
                $data = array(
                    'roles' => $user->getRoles(),
                    'token' => $this->JWTManager->create($user)
                );

                $response->headers->setCookie($cookie);
                $response->headers->set('Authorization', 'Bearer ' . $this->JWTManager->create($user));
                $response->setStatusCode(200);
                $message = 'User logged in!';
            } else {

                // remove all tokens

                // delete refresh token from db
                $deleteToken = $this->refreshTokenManager->get($refreshTokenCookie);

                if ($deleteToken != null) {
                    $this->refreshTokenManager->delete($deleteToken);
                    $message = 'User was already logged in! Terminating session.';
                } else {
                    $message = 'Token has no session! Terminating session.';
                }

                $host = Request::createFromGlobals();
                $host = $host->getHost();

                // remove refresh token from cookie
                $cookie = new Cookie(
                    "refresh_token",                          // Cookie name
                    'expired',                                       // Cookie content
                    (new DateTime('now'))->modify("-2592000 second"), // Expiration date
                    "/",                                     // Path
                    $host,                             // Domain
                    $request->getScheme() === 'https',       // Secure
                    true,                                   // HttpOnly
                    true,                                    // Raw
                    'Strict'                                 // SameSite policy
                );

                $response->headers->setCookie($cookie);
                $response->setStatusCode(400);
            }
        } else {

            $deleteToken = $this->refreshTokenManager->get($refreshTokenCookie);

            if ($deleteToken != null) {
                $this->refreshTokenManager->delete($deleteToken);
            }

            $host = Request::createFromGlobals();
            $host = $host->getHost();

            // remove refresh token from cookie
            $cookie = new Cookie(
                "refresh_token",                          // Cookie name
                'expired',                                       // Cookie content
                (new DateTime('now'))->modify("-2592000 second"), // Expiration date
                "/",                                     // Path
                $host,                             // Domain
                $request->getScheme() === 'https',       // Secure
                true,                                   // HttpOnly
                true,                                    // Raw
                'Strict'                                 // SameSite policy
            );

            $response->headers->setCookie($cookie);
            $response->setStatusCode(400);
        }

        $response->setContent(json_encode(array('message' => $message, 'data' => $data)));
        return $response;
    }


    // User logout
    #[Route(path: '/auth/logout', name: 'api_auth_logout', methods: ['POST'])]
    public function user_logout(Request $request): Response
    {
        // initialise
        $response = new JsonResponse();
        $response->headers->set('Content-Type', 'application/json');
        $message = '';

        // Get refresh token from cookie
        $refreshTokenCookie = $request->cookies->get('refresh_token');
        $refreshToken = $this->refreshTokenManager->get($refreshTokenCookie);

        if ($refreshToken != null) {
            $this->refreshTokenManager->delete($refreshToken);

            // DELETE ACCESS TOKEN SERVER-SIDE
            // // check on access token
            // try {
            //     // access token found
            //     $accessTokenBearer = $_SERVER['HTTP_AUTHORIZATION'];
            //     $accessToken = $this->JWTManager->parse(str_replace("Bearer", "", trim(str_replace("Bearer", "", $accessTokenBearer))));
            //     $message=$accessToken;
            // } catch (Exception $e) {
            //     // access token not found
            //     $message='Access token not found!';
            // }
            $message = 'User logged out!';
        } else {
            $message = 'User already logged out!';
        }

        // remove refresh token from cookie
        $host = Request::createFromGlobals();
        $host = $host->getHost();

        $cookie = new Cookie(
            "refresh_token",                          // Cookie name
            'expired',                                       // Cookie content
            (new DateTime('now'))->modify("-2592000 second"), // Expiration date
            "/",                                     // Path
            $host,                             // Domain
            $request->getScheme() === 'https',       // Secure
            true,                                   // HttpOnly
            true,                                    // Raw
            'Strict'                                 // SameSite policy
        );

        $response->headers->setCookie($cookie);
        $response->setStatusCode(200);
        $response->setContent(json_encode(array('message' => $message)));
        return $response;
    }
}
