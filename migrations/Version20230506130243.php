<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230506130243 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE dream (id INT AUTO_INCREMENT NOT NULL, user_id_id INT NOT NULL, title VARCHAR(255) NOT NULL, sleep_time DATE DEFAULT NULL, wake_time DATE DEFAULT NULL, dream_type VARCHAR(255) NOT NULL, setting VARCHAR(255) DEFAULT NULL, emotion VARCHAR(255) DEFAULT NULL, vividness VARCHAR(255) DEFAULT NULL, description VARCHAR(255) DEFAULT NULL, highlights VARCHAR(255) DEFAULT NULL, characters VARCHAR(255) DEFAULT NULL, INDEX IDX_6A5F004F9D86650F (user_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE dream ADD CONSTRAINT FK_6A5F004F9D86650F FOREIGN KEY (user_id_id) REFERENCES user (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE dream DROP FOREIGN KEY FK_6A5F004F9D86650F');
        $this->addSql('DROP TABLE dream');
    }
}
