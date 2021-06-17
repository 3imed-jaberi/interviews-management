<?php

namespace App\DataFixtures;

use App\Entity\Offer;
use App\Entity\Candidature;
use App\Entity\User;
use App\Helpers\TokenGenerator;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
    /**
     * @var UserPasswordEncoderInterface
     */
    private $passwordEncoder;

    /**
     * @var \Faker\Factory
     */
    private $faker;

    private const USERS = [
        [
            'username' => 'admin',
            'email' => 'admin@admin.com',
            'firstname' => 'imed',
            'lastname' => 'jaberi',
            'password' => 'secret123#',
            'roles' => [User::ROLE_ADMIN],
            'enabled' => true
        ],
        [
            'username' => 'john_doe',
            'email' => 'john@jhon.com',
            'firstname' => 'john',
            'lastname' => 'doe',
            'password' => 'secret123#',
            'roles' => [User::ROLE_RECRUITER],
            'enabled' => true
        ],
        [
            'username' => 'jawher',
            'email' => 'jawher@jawher.com',
            'firstname' => 'jawher',
            'lastname' => 'jaberi',
            'password' => 'secret123#',
            'roles' => [User::ROLE_CANDIDATE],
            'enabled' => true
        ]
    ];
    /**
     * @var TokenGenerator
     */
    private $tokenGenerator;

    public function __construct(
        UserPasswordEncoderInterface $passwordEncoder,
        TokenGenerator $tokenGenerator
    )
    {
        $this->passwordEncoder = $passwordEncoder;
        $this->faker = \Faker\Factory::create();
        $this->tokenGenerator = $tokenGenerator;
    }

    /**
     * Load data fixtures with the passed EntityManager
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager)
    {
        $this->loadUsers($manager);
        $this->loadOffers($manager);
        // $this->loadCandidatures($manager);
    }

    public function loadOffers(ObjectManager $manager)
    {
        for ($i = 0; $i < 100; $i++) {
            $offer = new Offer();
            $offer->setTitle($this->faker->realText(30));
            $offer->setPublished($this->faker->dateTimeThisYear);
            $offer->setDescription($this->faker->realText());

            $authorReference = $this->getRandomUserReference($offer);

            $offer->setAuthor($authorReference);

            $this->setReference("offer_$i", $offer);

            $manager->persist($offer);
        }

        $manager->flush();
    }

    public function loadCandidatures(ObjectManager $manager)
    {
        for ($i = 0; $i < 100; $i++) {
            for ($j = 0; $j < rand(10, 20); $j++) {
                $candidature = new Candidature();
                // $candidature->setContent($this->faker->realText());
                $candidature->setStatus('PENDING');
                $candidature->setPublished($this->faker->dateTimeThisYear);

                $authorReference = $this->getRandomUserReference($candidature);

                $candidature->setAuthor($authorReference);
                $candidature->setOffer($this->getReference("candidature_$i"));

                $manager->persist($candidature);
            }
        }

        $manager->flush();
    }

    public function loadUsers(ObjectManager $manager)
    {
        foreach (self::USERS as $userFixture) {
            $user = new User();
            $user->setUsername($userFixture['username']);
            $user->setEmail($userFixture['email']);
            $user->setFirstname($userFixture['firstname']);
            $user->setLastname($userFixture['lastname']);

            $user->setPassword(
                $this->passwordEncoder->encodePassword(
                    $user,
                    $userFixture['password']
                )
            );
            $user->setRoles($userFixture['roles']);
            $user->setEnabled($userFixture['enabled']);

            if (!$userFixture['enabled']) {
                $user->setConfirmationToken(
                    $this->tokenGenerator->getRandomSecureToken()
                );
            }

            $this->addReference('user_'.$userFixture['username'], $user);

            $manager->persist($user);
        }

        $manager->flush();
    }

    protected function getRandomUserReference($entity): User
    {
        $randomUser = self::USERS[rand(0, 2)];

        if ($entity instanceof Offer && !count(
                array_intersect(
                    $randomUser['roles'],
                    [User::ROLE_ADMIN, User::ROLE_RECRUITER]
                )
            )) {
            return $this->getRandomUserReference($entity);
        }

        if ($entity instanceof CANDIDATURE && !count(
                array_intersect(
                    $randomUser['roles'],
                    [
                      User::ROLE_ADMIN,
                      User::ROLE_CANDIDATE
                    ]
                )
            )) {
            return $this->getRandomUserReference($entity);
        }


        return $this->getReference(
            'user_'.$randomUser['username']
        );
    }
}
