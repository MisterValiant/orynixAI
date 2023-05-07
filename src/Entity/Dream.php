<?php

namespace App\Entity;

use App\Repository\DreamRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: DreamRepository::class)]
class Dream
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $sleep_time = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $wake_time = null;

    #[ORM\Column(length: 255)]
    private ?string $dream_type = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $setting = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $emotion = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $vividness = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $description = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $highlights = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $characters = null;

    #[ORM\ManyToOne(inversedBy: 'dreams')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user_id = null;

    #[ORM\Column(length: 2048, nullable: true)]
    private ?string $roadmap = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getSleepTime(): ?\DateTimeInterface
    {
        return $this->sleep_time;
    }

    public function setSleepTime(?\DateTimeInterface $sleep_time): self
    {
        $this->sleep_time = $sleep_time;

        return $this;
    }

    public function getWakeTime(): ?\DateTimeInterface
    {
        return $this->wake_time;
    }

    public function setWakeTime(?\DateTimeInterface $wake_time): self
    {
        $this->wake_time = $wake_time;

        return $this;
    }

    public function getDreamType(): ?string
    {
        return $this->dream_type;
    }

    public function setDreamType(string $dream_type): self
    {
        $this->dream_type = $dream_type;

        return $this;
    }

    public function getSetting(): ?string
    {
        return $this->setting;
    }

    public function setSetting(?string $setting): self
    {
        $this->setting = $setting;

        return $this;
    }

    public function getEmotion(): ?string
    {
        return $this->emotion;
    }

    public function setEmotion(?string $emotion): self
    {
        $this->emotion = $emotion;

        return $this;
    }

    public function getVividness(): ?string
    {
        return $this->vividness;
    }

    public function setVividness(?string $vividness): self
    {
        $this->vividness = $vividness;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getHighlights(): ?string
    {
        return $this->highlights;
    }

    public function setHighlights(?string $highlights): self
    {
        $this->highlights = $highlights;

        return $this;
    }

    public function getCharacters(): ?string
    {
        return $this->characters;
    }

    public function setCharacters(?string $characters): self
    {
        $this->characters = $characters;

        return $this;
    }

    public function getUserId(): ?User
    {
        return $this->user_id;
    }

    public function setUserId(?User $user_id): self
    {
        $this->user_id = $user_id;

        return $this;
    }

    public function getRoadmap(): ?string
    {
        return $this->roadmap;
    }

    public function setRoadmap(?string $roadmap): self
    {
        $this->roadmap = $roadmap;

        return $this;
    }
}
