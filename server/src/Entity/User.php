<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\Validator\Constraints\UserPassword;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;
use App\Controller\ResetPasswordAction;

/**
 * @ApiResource(
 *     itemOperations={
 *         "get"={
 *             "access_control"="is_granted('IS_AUTHENTICATED_FULLY')",
 *             "normalization_context"={
 *                 "groups"={"get"}
 *             }
 *         },
 *         "put"={
 *             "access_control"="is_granted('IS_AUTHENTICATED_FULLY') and object == user",
 *             "denormalization_context"={
 *                 "groups"={"put"}
 *             },
 *             "normalization_context"={
 *                 "groups"={"get"}
 *             }
 *         },
 *         "put-reset-password"={
 *             "access_control"="is_granted('IS_AUTHENTICATED_FULLY') and object == user",
 *             "method"="PUT",
 *             "path"="/users/{id}/reset-password",
 *             "controller"=ResetPasswordAction::class,
 *             "denormalization_context"={
 *                 "groups"={"put-reset-password"}
 *             },
 *             "validation_groups"={"put-reset-password"}
 *         }
 *     },
 *     collectionOperations={
 *         "post"={
 *             "denormalization_context"={
 *                 "groups"={"post"}
 *             },
 *             "normalization_context"={
 *                 "groups"={"get"}
 *             },
 *             "validation_groups"={
 *                  "post"
 *              }
 *         }
 *     }
 * )
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @ORM\Table(name="`users`")
 * @UniqueEntity("username", errorPath="username", groups={"post"})
 * @UniqueEntity("email", groups={"post"})
 */
class User implements UserInterface
{
    /**
     * Roles
     */
    const ROLE_RECRUITER = 'ROLE_RECRUITER';
    const ROLE_ADMIN = 'ROLE_ADMIN';
    const ROLE_CANDIDATE = 'ROLE_CANDIDATE';

    const DEFAULT_ROLES = [self::ROLE_CANDIDATE];

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"get", "get-offer-with-author", "get-candidature-with-author"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Groups({"get", "post", "get-candidature-with-author", "get-offer-with-author"})
     * @Assert\NotBlank()
     * @Assert\Length(min=6, max=180)
     */
    private $username;

    /**
     * @ORM\Column(type="simple_array", length=200)
     * @Groups({"get-admin", "get-owner"})
     */
    private $roles;

    /**
     * @var string The hashed password
     * @ORM\Column(type="string", length=255)
     * @Groups({"post"})
     * @Assert\NotBlank()
     * @Assert\Regex(
     *     pattern="/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{7,}/",
     *     message="Password must be seven characters long and contain at least one digit, one upper case letter and one lower case letter"
     * )
     */
    private $password;

    /**
     * virtual field
     * @Assert\NotBlank()
     * @Assert\Expression(
     *     "this.getPassword() === this.getRetypedPassword()",
     *     message="Passwords does not match"
     * )
     */
    private $retypedPassword;

    /**
     * @Groups({"put-reset-password"})
     * @Assert\NotBlank(groups={"put-reset-password"})
     * @Assert\Regex(
     *     pattern="/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{7,}/",
     *     message="Password must be seven characters long and contain at least one digit, one upper case letter and one lower case letter",
     *     groups={"put-reset-password"}
     * )
     */
    private $newPassword;

    /**
     * @Groups({"put-reset-password"})
     * @Assert\NotBlank(groups={"put-reset-password"})
     * @Assert\Expression(
     *     "this.getNewPassword() === this.getNewRetypedPassword()",
     *     message="Passwords does not match",
     *     groups={"put-reset-password"}
     * )
     */
    private $newRetypedPassword;

    /**
     * @Groups({"put-reset-password"})
     * @Assert\NotBlank(groups={"put-reset-password"})
     * @UserPassword(groups={"put-reset-password"})
     */
    private $oldPassword;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Groups({"post", "put", "get-admin", "get-owner"})
     * @Assert\NotBlank()
     * @Assert\Email()
     * @Assert\Length(min=3, max=255)
     */
    private $email;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Offer", mappedBy="author")
     * @Groups({"get"})
     */
    private $offers;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Candidature", mappedBy="author")
     * @Groups({"get"})
     */
    private $candidatures;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"get", "post", "put", "get-candidature-with-author", "get-offer-with-author"})
     * @Assert\NotBlank()
     * @Assert\Length(min=3, max=255)
     */
    private $firstname;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"get", "post", "put", "get-candidature-with-author", "get-offer-with-author"})
     * @Assert\NotBlank()
     * @Assert\Length(min=4, max=255)
     */
    private $lastname;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $passwordChangeDate;

    /**
     * @ORM\Column(type="boolean")
     */
    private $enabled;

    /**
     * @ORM\Column(type="string", length=40)
     */
    private $confirmationToken;

    public function __construct()
    {
        $this->offers = new ArrayCollection();
        $this->candidatures = new ArrayCollection();
        $this->roles = self::DEFAULT_ROLES;
        $this->enabled = false;
        $this->confirmationToken = null;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->username;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        return  $this->roles;
    }

    public function setRoles(array $roles)
    {
        $this->roles = $roles;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * @return Collection
     */
    public function getOffers(): Collection
    {
        return $this->offers;
    }

    /**
     * @return Collection
     */
    public function getCandidaturess(): Collection
    {
        return $this->candidatures;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getRetypedPassword()
    {
        return $this->retypedPassword;
    }

    public function setRetypedPassword($retypedPassword): void
    {
        $this->retypedPassword = $retypedPassword;
    }

    public function getNewPassword(): ?string
    {
        return $this->newPassword;
    }

    public function setNewPassword($newPassword): void
    {
        $this->newPassword = $newPassword;
    }

    public function getNewRetypedPassword(): ?string
    {
        return $this->newRetypedPassword;
    }

    public function setNewRetypedPassword($newRetypedPassword): void
    {
        $this->newRetypedPassword = $newRetypedPassword;
    }

    public function getOldPassword(): ?string
    {
        return $this->oldPassword;
    }

    public function setOldPassword($oldPassword): void
    {
        $this->oldPassword = $oldPassword;
    }

    public function getEnabled(): ?bool
    {
        return $this->enabled;
    }

    public function setEnabled(bool $enabled)
    {
        $this->enabled = $enabled;
    }

    public function getConfirmationToken(): ?string
    {
        return $this->confirmationToken;
    }

    public function setConfirmationToken(string $confirmationToken)
    {
        $this->confirmationToken = $confirmationToken;
    }

    public function getPasswordChangeDate(): ?int
    {
        return $this->passwordChangeDate;
    }

    public function setPasswordChangeDate(?int $passwordChangeDate): self
    {
        $this->passwordChangeDate = $passwordChangeDate;

        return $this;
    }

    public function __toString(): string
    {
        return $this->firstname . '' . $this->lastname;
    }
}
