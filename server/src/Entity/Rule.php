<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\RuleRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *      normalizationContext={"groups"={"offer:output"}},
 *      denormalizationContext={"groups"={"offer:input"}}
 * )
 * 
 * @ORM\Entity(repositoryClass=RuleRepository::class)
 * @ORM\Table(name="`rules`")
 */
class Rule
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * 
     * @Groups({ "offer:output" })
     */
    private $id;

    /**
     * @ORM\Column(type="smallint")
     * 
     * @Groups({"offer:output", "offer:input"})
     */
    private $postNumberLimit;

    /**
     * @ORM\Column(type="date")
     * 
     * @Groups({"offer:output", "offer:input"})
     */
    private $expirationDuration;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPostNumberLimit(): ?int
    {
        return $this->postNumberLimit;
    }

    public function setPostNumberLimit(int $postNumberLimit): self
    {
        $this->postNumberLimit = $postNumberLimit;

        return $this;
    }

    public function getExpirationDuration(): ?\DateTimeInterface
    {
        return $this->expirationDuration;
    }

    public function setExpirationDuration(\DateTimeInterface $expirationDuration): self
    {
        $this->expirationDuration = $expirationDuration;

        return $this;
    }
}
