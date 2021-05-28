<?php

namespace App\DataPersister;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

/**
 *
 */
class UserDataPersister implements ContextAwareDataPersisterInterface
{
  private $_entityManager;
  private $_passwordEncoder;

  public function __construct(
      EntityManagerInterface $entityManager,
      UserPasswordEncoderInterface $passwordEncoder
  ) {
    $this->_entityManager = $entityManager;
    $this->_passwordEncoder = $passwordEncoder;
  }

  public function supports($data, array $context = []): bool
  {
    return $data instanceof User;
  }

  public function persist($data, array $context = [])
  {
    if ($data->getPlainPassword()) {
        $data->setPassword(
            $this->_passwordEncoder->encodePassword(
                $data,
                $data->getPlainPassword()
            )
        );

        // plain password cleanup methods.
        $data->eraseCredentials();
    }

    $this->_entityManager->persist($data);
    $this->_entityManager->flush();
  }

  public function remove($data, array $context = [])
  {
    $this->_entityManager->remove($data);
    $this->_entityManager->flush();
  }
}
