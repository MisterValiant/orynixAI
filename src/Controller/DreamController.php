<?php

namespace App\Controller;

use App\Entity\Dream;
use App\Entity\User;
use DateTime;
use Doctrine\Persistence\ManagerRegistry;
use Exception;
use Gesdinet\JWTRefreshTokenBundle\Model\RefreshTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/dream', name: 'app_dream')]
class DreamController extends AbstractController
{

    // constructor
    public $doctrine, $refreshTokenManager;
    public function __construct(
        ManagerRegistry $doctrine,
        RefreshTokenManagerInterface $refreshTokenManager
    ) {;
        $this->doctrine = $doctrine;
        $this->refreshTokenManager = $refreshTokenManager;
    }

    #[Route('/insert', name: 'app_insert_dream')]
    public function insertDream(Request $request): Response
    {
        // iniialise
        $message = 'No message from server';
        $data = 'No data returned from server';
        $response = new JsonResponse();
        $response->headers->set('Content-Type', 'application/json');
        $valid = true;
        $entityManager = $this->doctrine->getManager();
        $sleeptime = new DateTime();
        $waketime = new DateTime();
        $gptResponse = '';

        // read request
        $jsonData = json_decode($request->getContent(), true);

        // Validate post request
        try {
            // refresh token
            $refreshTokenCookie = $request->cookies->get('refresh_token');
            $refreshToken = $this->refreshTokenManager->get($refreshTokenCookie);

            if ($refreshToken != null) {
                // user from token
                $user = $this->doctrine->getRepository(User::class)->findOneBy(['username' => $refreshToken->getUsername()]);

                // validation
                if (
                    $jsonData['data']['title'] == ""
                    ||  $jsonData['data']['dream_type'] == ""
                    ||  $jsonData['data']['setting'] == ""
                    ||  $jsonData['data']['emotion'] == ""
                    ||  $jsonData['data']['vividness'] == ""
                    ||  $jsonData['data']['description'] == ""
                    ||  $jsonData['data']['highlights'] == ""
                    ||  $jsonData['data']['characters'] == ""
                ) {

                    $message = 'Required fields cannot be blank!';
                    $response->setStatusCode(400);
                    $valid = false;
                }


                // Date time validation
                if ($valid == true) {
                    if (!($jsonData['data']['sleep_time'] == '' || $jsonData['data']['wake_time'] == '')) {
                        try {
                            $sleeptime = new \DateTime($jsonData['data']['sleep_time']);
                            $waketime = new \DateTime($jsonData['data']['wake_time']);

                            if ($waketime > $sleeptime) {
                                $valid = true;
                            } else {
                                $valid = false;
                                $response->setStatusCode(400);
                                $message = 'Wake time must be greater than sleep time!';
                            }

                            if ($valid == true) {
                                if ($sleeptime > new DateTime()) {
                                    $response->setStatusCode(400);
                                    $message = 'Sleep time cannot be greater than today!';
                                    $valid = false;
                                } else if ($waketime > new DateTime()) {
                                    $response->setStatusCode(400);
                                    $message = 'Wake time cannot be greater than today!';
                                    $valid = false;
                                }
                            }
                        } catch (Exception $e) {
                            $response->setStatusCode(400);
                            $message = 'Sleep and wake time tampered!';
                            $sleeptime = '';
                            $waketime = '';
                            $valid = false;
                        }
                    } else {
                        $sleeptime = '';
                        $waketime = '';
                    }
                }

                // chatgpt
                if ($valid == true) {
                    $url = 'https://api.openai.com/v1/chat/completions'; // Replace with the API endpoint URL
                    $apiKey = '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'; // Replace with your OpenAI API key

                    $json = '{
                    "model": "gpt-3.5-turbo",
                    "messages": [
                      {"role": "system", "content": "You are a helpful assistant/seer named OrinixAI."},
                      {"role": "user", "content": "Subject title:' . $jsonData['data']['title'] . ' Type of dream:' . $jsonData['data']['dream_type'] . ' Vividness:' . $jsonData['data']['vividness'] . ' Setting:' . $jsonData['data']['setting'] . ' Highlights:' . $jsonData['data']['highlights'] . ' Emotional tone:' . $jsonData['data']['emotion'] . ' Dream Description:' . $jsonData['data']['description'] . ' Characters:' . $jsonData['data']['characters'] . '"},
                      {"role": "system", "content": "Pretend that researchers have discovered how to use dreams to predict future events. If it was a nightmare, comfort the user. Provide predictions to the user through a stepwise roadmap recommendation on how to achieve positive outcomes based on users current status in the future. Please provide directly only the bullet points of the roadmap and short motivational conclusion. Limit total field length to 225. Start with: \'OnyrixAI has the following recommendations for you:\'."}
                    ]
                  }';

                    $gptData = json_decode($json, true);

                    $headers = [
                        'Content-Type: application/json',
                        'Authorization: Bearer ' . $apiKey
                    ];

                    $curl = curl_init($url);
                    curl_setopt($curl, CURLOPT_POST, true);
                    curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($gptData));
                    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
                    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);

                    $gptResponse = curl_exec($curl);

                    if ($gptResponse  === false) {
                        // Handle request failure
                        $error = curl_error($curl);
                        // Handle the error
                    } else {
                        // Process the response
                        $responseData = json_decode($gptResponse, true);
                        $rawResponse = $responseData['choices'][0]['message']['content'];
                        $gptResponse = strstr($rawResponse, 'OnyrixAI has the following recommendations for you');
                        $data = $gptResponse;
                    }

                    curl_close($curl);

                    if ($gptResponse  === false) {
                        // Handle request failure
                        $valid = false;
                    } else {
                        // Process the response
                        // $response will contain the response from the API
                        $valid = true;
                    }
                }

                // Insert into DB
                if ($valid == true) {
                    $insert = new Dream();
                    $insert->setTitle($jsonData['data']['title']);

                    if ($sleeptime != '') {
                        $insert->setSleepTime($sleeptime);
                    }

                    if ($waketime != '') {
                        $insert->setWakeTime($waketime);
                    }

                    $insert->setDreamType($jsonData['data']['dream_type']);
                    $insert->setSetting($jsonData['data']['setting']);
                    $insert->setEmotion($jsonData['data']['emotion']);
                    $insert->setVividness($jsonData['data']['vividness']);
                    $insert->setDescription($jsonData['data']['description']);
                    $insert->setHighlights($jsonData['data']['highlights']);
                    $insert->setCharacters($jsonData['data']['characters']);
                    $insert->setRoadmap($gptResponse);
                    $insert->setUserId($user);

                    $entityManager->persist($insert);
                    $entityManager->flush();

                    $response->setStatusCode(200);
                    $message = 'New dream inserted!';
                }
            } else {
                $message = 'Error authenticating user!';
                $response->setStatusCode(400);
            }
        } catch (Exception $e) {
            $response->setStatusCode(400);
            $message = 'Invalid input! Please try again.';
        }

        $response->setContent(json_encode(array('message' => $message, 'data' => $data)));
        return $response;
    }

    #[Route('/read', name: 'app_read_dream')]
    public function readDream(Request $request): Response
    {
        // initialise
        $response = new JsonResponse();
        $response->headers->set('Content-Type', 'application/json');
        $message = 'No message from server';
        $data = 'No data from server';

        // refresh token
        $refreshTokenCookie = $request->cookies->get('refresh_token');
        $refreshToken = $this->refreshTokenManager->get($refreshTokenCookie);
        if (!($refreshToken == null || $refreshToken == '')) {
            // user from token
            $user = $this->doctrine->getRepository(User::class)->findOneBy(['username' => $refreshToken->getUsername()]);
            $dreams = $this->doctrine->getRepository(Dream::class)->findAll(['user_id'=>$user->getId()]);

            $resultArray = [];

            foreach ($dreams as $dream) {
                // Extract the relevant data from the entity and add it to the array
                $resultArray[] = [
                    'title' => $dream->getTitle(),
                    'setting' => $dream->getSetting(),
                    'emotion' => $dream->getEmotion(),
                    'vividness'=> $dream->getVividness(),
                    'description'=> $dream->getDescription(),
                    'highlights'=> $dream->getHighlights(),
                    'characters'=> $dream->getCharacters(),
                    'roadmap'=> $dream->getRoadmap(),
                    // Add more fields as needed
                ];
            }

            $data=$resultArray;

            $response->setStatusCode(200);
            $message = 'Dreams fetched';
        } else {
            $response->setStatusCode(400);
            $message = 'Error fetching dreams';
        }

        $response->setContent(json_encode($data));
        return $response;
    }
}
