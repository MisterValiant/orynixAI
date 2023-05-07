<?php

namespace App\Controller;

use App\Entity\User;
use DateTime;
use Doctrine\Persistence\ManagerRegistry;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/user', name: 'app_user')]
class UserController extends AbstractController
{
    public $doctrine, $passwordHasher;
    public function __construct(
        ManagerRegistry $doctrine,
        UserPasswordHasherInterface $passwordHasher
    ) {;
        $this->doctrine = $doctrine;
        $this->passwordHasher = $passwordHasher;
    }

    // Create new user
    #[Route('/register', name: 'register_user', methods: "POST")]
    public function new(Request $request): Response
    {
        // read request
        $jsonData = json_decode($request->getContent(), true);

        // iniialise
        $message = 'No message from server';
        $data = 'No data returned from server';
        $response = new JsonResponse();
        $response->headers->set('Content-Type', 'application/json');
        $valid = true;
        $phone_exist = true;


        $entityManager = $this->doctrine->getManager();

        // Validate post request
        try {

            if (
                $jsonData['data']['username'] == ""
                || $jsonData['data']['email'] == ""
                || $jsonData['data']['password'] == ""
                || $jsonData['data']['firstname'] == ""
                || $jsonData['data']['lastname'] == ""
            ) {
                $valid = false;
                $message = 'Fields cannot be blank! Please try again.';
                $response->setStatusCode(400);
            }

            // check username
            if ($valid == true) {
                $regex = '/^(?=.{4,20}$)(?![.\s])(?!.*[_.]{2})[@_]?[a-zA-Z][a-zA-Z0-9_]*(?<![.\s])$/';
                $username = $jsonData['data']['username'];

                if (!(preg_match($regex, $username))) {

                    if (preg_match('/^[0-9]/', $username)) {
                        $message = 'Username cannot start with a number';
                    } else if (!preg_match('/^([a-zA-Z@_])/', $username)) {
                        $message = 'Username cannot start with this special character';
                    } else if ((strlen($username) < 4)) {
                        $message = 'Username length must be greater than 3';
                    } else if ((strlen($username) > 20)) {
                        $message = 'Username length must be less than 20';
                    } else {
                        $message = 'Please enter a valid username';
                    }
                    $response->setStatusCode(400);
                    $valid = false;
                }
            }

            // check firstname
            if ($valid == true) {
                $regex = '/^(?=.{2,25}$)[a-zA-Z]+(?:\s[a-zA-Z]+)*$/';
                $firstname = $jsonData['data']['firstname'];

                if (!(preg_match($regex, $firstname))) {

                    if (preg_match('/\d/', $firstname)) {
                        $message = 'Firstname cannot contain numbers';
                    } else if (preg_match('/[^\w\s]/', $firstname)) {
                        $message = 'Firstname cannot contain special characters';
                    } else if (preg_match('/\s\s+/', $firstname)) {
                        $message = 'Remove consecutive spaces from firstname';
                    } else if ((strlen($firstname) < 2)) {
                        $message = 'Firstname length must be greater than 2';
                    } else if ((strlen($firstname) > 25)) {
                        $message = 'Firstname length must be less than 25';
                    } else {
                        $message = 'Please enter a valid firstname';
                    }
                    $response->setStatusCode(400);
                    $valid = false;
                }
            }

            // check lastname
            if ($valid == true) {
                $regex = '/^(?=.{2,25}$)[a-zA-Z]+(?:\s[a-zA-Z]+)*$/';
                $firstname = $jsonData['data']['firstname'];

                if (!(preg_match($regex, $firstname))) {

                    if (preg_match('/\d/', $firstname)) {
                        $message = 'Firstname cannot contain numbers';
                    } else if (preg_match('/[^\w\s]/', $firstname)) {
                        $message = 'Firstname cannot contain special characters';
                    } else if (preg_match('/\s\s+/', $firstname)) {
                        $message = 'Remove consecutive spaces from firstname';
                    } else if ((strlen($firstname) < 2)) {
                        $message = 'Firstname length must be greater than 2';
                    } else if ((strlen($firstname) > 25)) {
                        $message = 'Firstname length must be less than 25';
                    } else {
                        $message = 'Please enter a valid firstname';
                    }
                    $response->setStatusCode(400);
                    $valid = false;
                }
            }

            // check email
            if ($valid == true) {
                $regex = '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/';
                $email = $jsonData['data']['email'];

                if (!(preg_match($regex, $email))) {

                    if (!preg_match('/@/', $email)) {
                        $message = 'An email should have the @ sign';
                    }else{
                        $message = 'Invalid email format';
                    }
                    $response->setStatusCode(400);
                    $valid = false;
                }
            }

            // check phone
            if ($valid == true) {
                try {
                    if ($jsonData['data']['phone'] != "") {
                        $regex = '/^\+(?:[0-9] ?){6,14}[0-9]$/';
                        $phone = $jsonData['data']['phone'];

                        if (!(preg_match($regex, $phone))) {
                            if (!preg_match('/\+/', $phone)) {
                                $message = 'Country code is missing + sign';
                            } else {
                                $message = 'Phone number has invalid format';
                            }
                            $response->setStatusCode(400);
                            $valid = false;
                            $phone_exist = false;
                        } else {
                            $phone_exist = true;
                        }
                    } else {
                        $phone_exist = false;
                    }
                } catch (Exception $e) {
                    $phone_exist = false;
                }
            }

            // check password
            if ($valid == true) {
                $password = $jsonData['data']['password'];
                $regex = '/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s:])([^\s]){8,20}$/';

                if (!(preg_match($regex, $password))) {
                    if (strlen($password) < 8) {
                        $message = 'Password length must be greater than 8';
                    } else if (strlen($password) > 20) {
                        $message = 'Password length must be less than 20';
                    } else if (!preg_match('/[a-z]/', $password)) {
                        $message = 'Password must have at least one lowercase';
                    } else if (!preg_match('/[A-Z]/', $password)) {
                        $message = 'Password must have at least one uppercase';
                    } else if (!preg_match('/[!@#$%^&*()\-_=+{};:,<.>]/', $password)) {
                        $message = 'Password must contain at least one special character';
                    } else if (!preg_match('/\d/', $password)) {
                        $message = 'Password must contain at least one number';
                    } else {
                        $message = 'Password is invalid';
                    }
                    $response->setStatusCode(400);
                    $valid = false;
                }
            }

            // if true; register user
            try {
                if ($valid == true) {
                    $insert = new User();
                    $insert->setUsername($jsonData['data']['username']);
                    $insert->setFirstname($jsonData['data']['firstname']);
                    $insert->setLastname($jsonData['data']['lastname']);
                    $insert->setEmail($jsonData['data']['email']);
                    if ($phone_exist){
                    $insert->setPhone($jsonData['data']['phone']);
                    }else{
                        $insert->setPhone(null);
                    }
                    $insert->setPassword($jsonData['data']['password']);
                    $insert->setRoles(['ROLE_USER']);
                    $insert->setStatus(1);

                    $insertDate = new DateTime(date('d-m-Y'));
                    $insert->setLastLogin($insertDate);
                    $insert->setDateCreated($insertDate);
                    $insert->setDateUpdated($insertDate);
                    $insert->setAvatar(null);

                    $hashedPassword = $this->passwordHasher->hashPassword(
                        $insert,
                        $jsonData['data']['password']
                    );
                    $insert->setPassword($hashedPassword);

                    $entityManager->persist($insert);
                    $entityManager->flush();

                    $message = 'Registration successful!';
                    $response->setStatusCode(200);
                }
            } catch (Exception $e) {
                $message = 'This user already exists!';
                $response->setStatusCode(400);
            }
        } catch (Exception $e) {
            $message = 'Invalid credentials! Please try again.';
            $response->setStatusCode(400);
        }

        $response->setContent(json_encode(array('message' => $message, 'data' => $data)));
        return $response;
    }
}
