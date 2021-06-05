<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CandidatureRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *     attributes={
 *         "order"={"published": "DESC"},
 *         "pagination_client_enabled"=true,
 *         "pagination_client_items_per_page"=true
 *     },
 *     itemOperations={
 *         "get",
 *         "put"={
 *             "access_control"="is_granted('ROLE_RECRUITER') or (is_granted('ROLE_CANDIDATE') and object.getAuthor() == user)"
 *         }
 *     },
 *     collectionOperations={
 *         "get",
 *         "post"={
 *             "access_control"="is_granted('ROLE_CANDIDATE')",
 *             "normalization_context"={
 *                 "groups"={"get-candidature-with-author"}
 *             }
 *         },
 *         "api_offers_candidatures_get_subresource"={
 *             "normalization_context"={
 *                 "groups"={"get-candidature-with-author"}
 *             }
 *         }
 *     },
 *     denormalizationContext={
 *         "groups"={"post"}
 *     }
 * )
 * @ORM\Entity(repositoryClass=CandidatureRepository::class)
 * @ORM\Table(name="`candidatures`")
 */
class Candidature implements AuthoredEntityInterface, PublishedDateEntityInterface
{
    /**
     * TODO: add resume (CV)
     */

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"get-candidature-with-author"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=10)
     * @Groups({"post", "get-candidature-with-author"})
     * @Assert\NotBlank()
     */
    private $status;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"get-candidature-with-author"})
     */
    private $published;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="candidatures")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"get-candidature-with-author"})
     */
    private $author;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Offer", inversedBy="candidatures")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"post"})
     */
    private $offer;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getPublished(): ?\DateTimeInterface
    {
        return $this->published;
    }

    public function setPublished(\DateTimeInterface $published): PublishedDateEntityInterface
    {
        $this->published = $published;

        return $this;
    }

        /**
     * @return User
     */
    public function getAuthor(): ?User
    {
        return $this->author;
    }

    /**
     * @param UserInterface $author
     */
    public function setAuthor(UserInterface $author): AuthoredEntityInterface
    {
        $this->author = $author;

        return $this;
    }

    public function getOffer(): ?Offer
    {
        return $this->offer;
    }

    public function setOffer(Offer $offer): self
    {
        $this->offer = $offer;

        return $this;
    }
}
