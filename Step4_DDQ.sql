--Create Tables

DROP TABLE IF EXISTS `teams`;
CREATE TABLE `teams` (
`team_id` int(11) NOT NULL AUTO_INCREMENT,
`first_name` varchar(255) NOT NULL,
`last_name` varchar(255) NOT NULL,
`active_member` boolean NOT NULL,
PRIMARY KEY (team_id),
CONSTRAINT `full_name` UNIQUE (first_name, last_name)
) ENGINE=InnoDB;

DROP TABLE IF EXISTS `seasons`;
CREATE TABLE `seasons` (
`season_id` int(11) NOT NULL AUTO_INCREMENT,
`year` int(11) NOT NULL,
`championship_team_id` int,
`runner_up_id` int,
PRIMARY KEY (season_id),
FOREIGN KEY (championship_team_id) REFERENCES teams(team_id),
FOREIGN KEY (runner_up_id) REFERENCES teams(team_id)
) ENGINE=InnoDB;

DROP TABLE IF EXISTS `season_teams`;
CREATE TABLE `season_teams` (
`season_id` int,
`team_id` int,
`made_playoffs` boolean NOT NULL,
PRIMARY KEY (season_id, team_id),
FOREIGN KEY (season_id) REFERENCES seasons(season_id),
FOREIGN KEY (team_id) REFERENCES teams(team_id)
) ENGINE=InnoDB;

DROP TABLE IF EXISTS `league_dues`;

CREATE TABLE `league_dues` (
`dues_id` int NOT NULL AUTO_INCREMENT,
`season_id` int,
`team_id` int,
`amount` int NOT NULL,
PRIMARY KEY (dues_id),
FOREIGN KEY (season_id) REFERENCES seasons(season_id),
FOREIGN KEY (team_id) REFERENCES teams(team_id)
) ENGINE=InnoDB;

DROP TABLE IF EXISTS `matchups`;
CREATE TABLE `matchups` (
`matchup_id` int NOT NULL AUTO_INCREMENT,
`season_id` int,
`week` int(11) NOT NULL,
`home_team_id` int,
`away_team_id` int,
`home_team_score` FLOAT(10),
`away_team_score` FLOAT(10),
PRIMARY KEY (matchup_id),
FOREIGN KEY (season_id) REFERENCES seasons(season_id),
FOREIGN KEY (home_team_id) REFERENCES teams(team_id),
FOREIGN KEY (away_team_id) REFERENCES teams(team_id)
) ENGINE=InnoDB;


-- Insert into Teams - all values
INSERT INTO teams (first_name, last_name, active_member) VALUES
('Ron', 'Klein', 1), ('Adam', 'Bolton', 1), ('Dan', 'Cobert', 1), ('Dan', 'Friedman', 1),
('Justin', 'Gatt', 1), ('Derek', 'Tinkle', 1), ('Matt', 'Colville', 1), ('Neil', 'Arthur', 1),
('Zell', 'Zoerhof', 1), ('Adam', 'Kunkel', 1), ('Mitch', 'Goncalves', 1), ('Nate', 'Maziar', 1),
('Kurt', 'Peters', 0), ('Jon', 'Habshoosh', 0), ('Danny', 'Kaafrani', 0), ('Amos', 'Goldstein', 0),
('Danny', 'Ackerman', 0), ('Kyle', 'Tennenbaum', 0), ('Sam', 'Miller', 0), ('Joe', 'Demery', 0),
('Alex', 'Benfield', 0), ('Will', 'Timmer', 0);

-- Insert into Championships
INSERT INTO seasons (year, championship_team_id, runner_up_id) VALUES
(2010, (SELECT team_id FROM teams WHERE last_name='Cobert'), (SELECT team_id FROM teams WHERE last_name='Colville')),
(2011, (SELECT team_id FROM teams WHERE last_name='Gatt'), (SELECT team_id FROM teams WHERE last_name='Klein')),
(2012, (SELECT team_id FROM teams WHERE last_name='Bolton'), (SELECT team_id FROM teams WHERE last_name='Klein')),
(2013, (SELECT team_id FROM teams WHERE last_name='Friedman'), (SELECT team_id FROM teams WHERE last_name='Bolton')),
(2014, (SELECT team_id FROM teams WHERE last_name='Bolton'), (SELECT team_id FROM teams WHERE last_name='Zoerhof')),
(2015, (SELECT team_id FROM teams WHERE last_name='Cobert'), (SELECT team_id FROM teams WHERE last_name='Kunkel')),
(2016, (SELECT team_id FROM teams WHERE last_name='Gatt'), (SELECT team_id FROM teams WHERE last_name='Cobert')),
(2017, (SELECT team_id FROM teams WHERE last_name='Tinkle'), (SELECT team_id FROM teams WHERE last_name='Maziar')),
(2018, (SELECT team_id FROM teams WHERE last_name='Klein'), (SELECT team_id FROM teams WHERE last_name='Tinkle')),
(2019, (SELECT team_id FROM teams WHERE last_name='Maziar'), (SELECT team_id FROM teams WHERE last_name='Colville'));

--Insert into Teams in Seasons
INSERT INTO season_teams (season_id, team_id, made_playoffs) VALUES
((SELECT season_id from seasons WHERE year=2019), (SELECT team_id FROM teams WHERE last_name='Maziar'), 1),
((SELECT season_id from seasons WHERE year=2019), (SELECT team_id FROM teams WHERE last_name='Bolton'), 1),
((SELECT season_id from seasons WHERE year=2019), (SELECT team_id FROM teams WHERE last_name='Colville'), 1),
((SELECT season_id from seasons WHERE year=2019), (SELECT team_id FROM teams WHERE last_name='Kunkel'), 1),
((SELECT season_id from seasons WHERE year=2019), (SELECT team_id FROM teams WHERE last_name='Tinkle'), 1),
((SELECT season_id from seasons WHERE year=2019), (SELECT team_id FROM teams WHERE last_name='Gatt'), 1),
((SELECT season_id from seasons WHERE year=2019), (SELECT team_id FROM teams WHERE last_name='Cobert'), 0),
((SELECT season_id from seasons WHERE year=2019), (SELECT team_id FROM teams WHERE last_name='Klein'), 0),
((SELECT season_id from seasons WHERE year=2019), (SELECT team_id FROM teams WHERE last_name='Goncalves'), 0),
((SELECT season_id from seasons WHERE year=2019), (SELECT team_id FROM teams WHERE last_name='Arthur'), 0),
((SELECT season_id from seasons WHERE year=2019), (SELECT team_id FROM teams WHERE last_name='Zoerhof'), 0),
((SELECT season_id from seasons WHERE year=2019), (SELECT team_id FROM teams WHERE last_name='Friedman'), 0);

-- Insert into Dues
INSERT INTO league_dues (season_id, team_id, amount) VALUES
((SELECT season_id from seasons WHERE year=2019), (SELECT team_id FROM teams WHERE last_name='Maziar'), -250),
((SELECT season_id from seasons WHERE year=2019), (SELECT team_id FROM teams WHERE last_name='Bolton'), -250),
((SELECT season_id from seasons WHERE year=2019), (SELECT team_id FROM teams WHERE last_name='Colville'), -250),
((SELECT season_id from seasons WHERE year=2019), (SELECT team_id FROM teams WHERE last_name='Kunkel'), -250),
((SELECT season_id from seasons WHERE year=2019), (SELECT team_id FROM teams WHERE last_name='Tinkle'), -250),
((SELECT season_id from seasons WHERE year=2019), (SELECT team_id FROM teams WHERE last_name='Gatt'), -250),
((SELECT season_id from seasons WHERE year=2019), (SELECT team_id FROM teams WHERE last_name='Cobert'), -250),
((SELECT season_id from seasons WHERE year=2019), (SELECT team_id FROM teams WHERE last_name='Klein'), -250),
((SELECT season_id from seasons WHERE year=2019), (SELECT team_id FROM teams WHERE last_name='Goncalves'), -250),
((SELECT season_id from seasons WHERE year=2019), (SELECT team_id FROM teams WHERE last_name='Arthur'), -250),
((SELECT season_id from seasons WHERE year=2019), (SELECT team_id FROM teams WHERE last_name='Zoerhof'), -250),
((SELECT season_id from seasons WHERE year=2019), (SELECT team_id FROM teams WHERE last_name='Friedman'), -250),
((SELECT season_id from seasons WHERE year=2019), (SELECT team_id FROM teams WHERE last_name='Maziar'), 2000),
((SELECT season_id from seasons WHERE year=2019), (SELECT team_id FROM teams WHERE last_name='Colville'), 700),
((SELECT season_id from seasons WHERE year=2019), (SELECT team_id FROM teams WHERE last_name='Gatt'), 300);

-- Insert Into Matchup - Need alot More values:
INSERT INTO matchups (season_id, week, home_team_id, away_team_id, home_team_score, away_team_score) VALUES
((SELECT season_id FROM seasons WHERE year=2019), (1), (SELECT team_id FROM teams WHERE last_name='Bolton'),(SELECT team_id FROM teams WHERE last_name='Goncalves'), (123.6), (107.34)),
((SELECT season_id FROM seasons WHERE year=2019), (1), (SELECT team_id FROM teams WHERE last_name='Gatt'),(SELECT team_id FROM teams WHERE last_name='Cobert'), (94.02), (63.74)),
((SELECT season_id FROM seasons WHERE year=2019), (1), (SELECT team_id FROM teams WHERE last_name='Maziar'),(SELECT team_id FROM teams WHERE last_name='Kunkel'), (125.22), (99.52));
