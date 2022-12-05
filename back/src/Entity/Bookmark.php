<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\BookmarkRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: BookmarkRepository::class)]
#[ApiResource]
class Bookmark
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $articleID = null;

    #[ORM\Column]
    private ?int $userID = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getArticleID(): ?int
    {
        return $this->articleID;
    }

    public function setArticleID(int $articleID): self
    {
        $this->articleID = $articleID;

        return $this;
    }

    public function getUserID(): ?int
    {
        return $this->userID;
    }

    public function setUserID(int $userID): self
    {
        $this->userID = $userID;

        return $this;
    }
}
