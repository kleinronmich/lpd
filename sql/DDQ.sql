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
`wins` int,
`losses` int,
`ties  ` int,
`points_scored` FLOAT(10),
`points_against` FLOAT(10),
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

-- Insert into Seasons
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
INSERT INTO season_teams (season_id, team_id, made_playoffs, wins, losses, ties, points_scored, points_against) VALUES
((SELECT season_id from seasons WHERE year=2019), (SELECT team_id FROM teams WHERE last_name='Maziar'), 1, 8, 5, 0, 1190.98, 1179.66),
((SELECT season_id from seasons WHERE year=2019), (SELECT team_id FROM teams WHERE last_name='Bolton'), 1, 7, 6, 0, 1187, 1176.28),
((SELECT season_id from seasons WHERE year=2019), (SELECT team_id FROM teams WHERE last_name='Colville'), 1, 8, 5, 0, 1117.62, 1085.84),
((SELECT season_id from seasons WHERE year=2019), (SELECT team_id FROM teams WHERE last_name='Kunkel'), 1, 7, 6, 0, 1186.32, 1031.92),
((SELECT season_id from seasons WHERE year=2019), (SELECT team_id FROM teams WHERE last_name='Tinkle'), 1, 9, 4, 0, 1192.38, 1145.78),
((SELECT season_id from seasons WHERE year=2019), (SELECT team_id FROM teams WHERE last_name='Gatt'), 1, 8, 5, 0, 1340.24, 1205.38),
((SELECT season_id from seasons WHERE year=2019), (SELECT team_id FROM teams WHERE last_name='Cobert'), 0, 3, 10, 0, 975.74, 1130.26),
((SELECT season_id from seasons WHERE year=2019), (SELECT team_id FROM teams WHERE last_name='Klein'), 0, 6, 7, 0, 1096.08, 1132.34),
((SELECT season_id from seasons WHERE year=2019), (SELECT team_id FROM teams WHERE last_name='Goncalves'), 0, 5, 8, 0, 1230.98, 1267.6),
((SELECT season_id from seasons WHERE year=2019), (SELECT team_id FROM teams WHERE last_name='Arthur'), 0, 7, 6, 0, 1156.28, 1155.42),
((SELECT season_id from seasons WHERE year=2019), (SELECT team_id FROM teams WHERE last_name='Zoerhof'), 0, 6, 7, 0, 956.6, 1037.12),
((SELECT season_id from seasons WHERE year=2019), (SELECT team_id FROM teams WHERE last_name='Friedman'), 0, 4, 9, 0, 1042.9, 1125.52);

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
((SELECT season_id from seasons WHERE year=2019), (SELECT team_id FROM teams WHERE last_name='Gatt'), 300),

((SELECT season_id from seasons WHERE year=2018), (SELECT team_id FROM teams WHERE last_name='Maziar'), -200),
((SELECT season_id from seasons WHERE year=2018), (SELECT team_id FROM teams WHERE last_name='Bolton'), -200),
((SELECT season_id from seasons WHERE year=2018), (SELECT team_id FROM teams WHERE last_name='Colville'), -200),
((SELECT season_id from seasons WHERE year=2018), (SELECT team_id FROM teams WHERE last_name='Kunkel'), -200),
((SELECT season_id from seasons WHERE year=2018), (SELECT team_id FROM teams WHERE last_name='Tinkle'), -200),
((SELECT season_id from seasons WHERE year=2018), (SELECT team_id FROM teams WHERE last_name='Gatt'), -200),
((SELECT season_id from seasons WHERE year=2018), (SELECT team_id FROM teams WHERE last_name='Cobert'), -200),
((SELECT season_id from seasons WHERE year=2018), (SELECT team_id FROM teams WHERE last_name='Klein'), -200),
((SELECT season_id from seasons WHERE year=2018), (SELECT team_id FROM teams WHERE last_name='Goncalves'), -200),
((SELECT season_id from seasons WHERE year=2018), (SELECT team_id FROM teams WHERE last_name='Arthur'), -200),
((SELECT season_id from seasons WHERE year=2018), (SELECT team_id FROM teams WHERE last_name='Zoerhof'), -200),
((SELECT season_id from seasons WHERE year=2018), (SELECT team_id FROM teams WHERE last_name='Friedman'), -200),
((SELECT season_id from seasons WHERE year=2018), (SELECT team_id FROM teams WHERE last_name='Klein'), 1600),
((SELECT season_id from seasons WHERE year=2018), (SELECT team_id FROM teams WHERE last_name='Tinkle'), 800),

((SELECT season_id from seasons WHERE year=2017), (SELECT team_id FROM teams WHERE last_name='Maziar'), -200),
((SELECT season_id from seasons WHERE year=2017), (SELECT team_id FROM teams WHERE last_name='Bolton'), -200),
((SELECT season_id from seasons WHERE year=2017), (SELECT team_id FROM teams WHERE last_name='Colville'), -200),
((SELECT season_id from seasons WHERE year=2017), (SELECT team_id FROM teams WHERE last_name='Kunkel'), -200),
((SELECT season_id from seasons WHERE year=2017), (SELECT team_id FROM teams WHERE last_name='Tinkle'), -200),
((SELECT season_id from seasons WHERE year=2017), (SELECT team_id FROM teams WHERE last_name='Gatt'), -200),
((SELECT season_id from seasons WHERE year=2017), (SELECT team_id FROM teams WHERE last_name='Cobert'), -200),
((SELECT season_id from seasons WHERE year=2017), (SELECT team_id FROM teams WHERE last_name='Klein'), -200),
((SELECT season_id from seasons WHERE year=2017), (SELECT team_id FROM teams WHERE last_name='Goncalves'), -200),
((SELECT season_id from seasons WHERE year=2017), (SELECT team_id FROM teams WHERE last_name='Arthur'), -200),
((SELECT season_id from seasons WHERE year=2017), (SELECT team_id FROM teams WHERE last_name='Zoerhof'), -200),
((SELECT season_id from seasons WHERE year=2017), (SELECT team_id FROM teams WHERE last_name='Friedman'), -200),
((SELECT season_id from seasons WHERE year=2017), (SELECT team_id FROM teams WHERE last_name='Tinkle'), 1600),
((SELECT season_id from seasons WHERE year=2017), (SELECT team_id FROM teams WHERE last_name='Maziar'), 800),

((SELECT season_id from seasons WHERE year=2016), (SELECT team_id FROM teams WHERE last_name='Maziar'), -150),
((SELECT season_id from seasons WHERE year=2016), (SELECT team_id FROM teams WHERE last_name='Bolton'), -150),
((SELECT season_id from seasons WHERE year=2016), (SELECT team_id FROM teams WHERE last_name='Colville'), -150),
((SELECT season_id from seasons WHERE year=2016), (SELECT team_id FROM teams WHERE last_name='Kunkel'), -150),
((SELECT season_id from seasons WHERE year=2016), (SELECT team_id FROM teams WHERE last_name='Tinkle'), -150),
((SELECT season_id from seasons WHERE year=2016), (SELECT team_id FROM teams WHERE last_name='Gatt'), -150),
((SELECT season_id from seasons WHERE year=2016), (SELECT team_id FROM teams WHERE last_name='Cobert'), -150),
((SELECT season_id from seasons WHERE year=2016), (SELECT team_id FROM teams WHERE last_name='Klein'), -150),
((SELECT season_id from seasons WHERE year=2016), (SELECT team_id FROM teams WHERE last_name='Timmer'), -150),
((SELECT season_id from seasons WHERE year=2016), (SELECT team_id FROM teams WHERE last_name='Arthur'), -150),
((SELECT season_id from seasons WHERE year=2016), (SELECT team_id FROM teams WHERE last_name='Zoerhof'), -150),
((SELECT season_id from seasons WHERE year=2016), (SELECT team_id FROM teams WHERE last_name='Friedman'), -150),
((SELECT season_id from seasons WHERE year=2016), (SELECT team_id FROM teams WHERE last_name='Gatt'), 1200),
((SELECT season_id from seasons WHERE year=2016), (SELECT team_id FROM teams WHERE last_name='Cobert'), 600),

((SELECT season_id from seasons WHERE year=2015), (SELECT team_id FROM teams WHERE last_name='Maziar'), -100),
((SELECT season_id from seasons WHERE year=2015), (SELECT team_id FROM teams WHERE last_name='Bolton'), -100),
((SELECT season_id from seasons WHERE year=2015), (SELECT team_id FROM teams WHERE last_name='Colville'), -100),
((SELECT season_id from seasons WHERE year=2015), (SELECT team_id FROM teams WHERE last_name='Kunkel'), -100),
((SELECT season_id from seasons WHERE year=2015), (SELECT team_id FROM teams WHERE last_name='Tinkle'), -100),
((SELECT season_id from seasons WHERE year=2015), (SELECT team_id FROM teams WHERE last_name='Gatt'), -100),
((SELECT season_id from seasons WHERE year=2015), (SELECT team_id FROM teams WHERE last_name='Cobert'), -100),
((SELECT season_id from seasons WHERE year=2015), (SELECT team_id FROM teams WHERE last_name='Klein'), -100),
((SELECT season_id from seasons WHERE year=2015), (SELECT team_id FROM teams WHERE last_name='Timmer'), -100),
((SELECT season_id from seasons WHERE year=2015), (SELECT team_id FROM teams WHERE last_name='Arthur'), -100),
((SELECT season_id from seasons WHERE year=2015), (SELECT team_id FROM teams WHERE last_name='Zoerhof'), -100),
((SELECT season_id from seasons WHERE year=2015), (SELECT team_id FROM teams WHERE last_name='Friedman'), -100),
((SELECT season_id from seasons WHERE year=2015), (SELECT team_id FROM teams WHERE last_name='Cobert'), 800),
((SELECT season_id from seasons WHERE year=2015), (SELECT team_id FROM teams WHERE last_name='Kunkel'), 400),

((SELECT season_id from seasons WHERE year=2014), (SELECT team_id FROM teams WHERE last_name='Maziar'), -100),
((SELECT season_id from seasons WHERE year=2014), (SELECT team_id FROM teams WHERE last_name='Bolton'), -100),
((SELECT season_id from seasons WHERE year=2014), (SELECT team_id FROM teams WHERE last_name='Colville'), -100),
((SELECT season_id from seasons WHERE year=2014), (SELECT team_id FROM teams WHERE last_name='Kunkel'), -100),
((SELECT season_id from seasons WHERE year=2014), (SELECT team_id FROM teams WHERE last_name='Tinkle'), -100),
((SELECT season_id from seasons WHERE year=2014), (SELECT team_id FROM teams WHERE last_name='Gatt'), -100),
((SELECT season_id from seasons WHERE year=2014), (SELECT team_id FROM teams WHERE last_name='Cobert'), -100),
((SELECT season_id from seasons WHERE year=2014), (SELECT team_id FROM teams WHERE last_name='Klein'), -100),
((SELECT season_id from seasons WHERE year=2014), (SELECT team_id FROM teams WHERE last_name='Timmer'), -100),
((SELECT season_id from seasons WHERE year=2014), (SELECT team_id FROM teams WHERE last_name='Miller'), -100),
((SELECT season_id from seasons WHERE year=2014), (SELECT team_id FROM teams WHERE last_name='Zoerhof'), -100),
((SELECT season_id from seasons WHERE year=2014), (SELECT team_id FROM teams WHERE last_name='Friedman'), -100),
((SELECT season_id from seasons WHERE year=2014), (SELECT team_id FROM teams WHERE last_name='Bolton'), 800),
((SELECT season_id from seasons WHERE year=2014), (SELECT team_id FROM teams WHERE last_name='Zoerhof'), 400),

((SELECT season_id from seasons WHERE year=2013), (SELECT team_id FROM teams WHERE last_name='Maziar'), -50),
((SELECT season_id from seasons WHERE year=2013), (SELECT team_id FROM teams WHERE last_name='Bolton'), -50),
((SELECT season_id from seasons WHERE year=2013), (SELECT team_id FROM teams WHERE last_name='Colville'), -50),
((SELECT season_id from seasons WHERE year=2013), (SELECT team_id FROM teams WHERE last_name='Kunkel'), -50),
((SELECT season_id from seasons WHERE year=2013), (SELECT team_id FROM teams WHERE last_name='Tinkle'), -50),
((SELECT season_id from seasons WHERE year=2013), (SELECT team_id FROM teams WHERE last_name='Gatt'), -50),
((SELECT season_id from seasons WHERE year=2013), (SELECT team_id FROM teams WHERE last_name='Cobert'), -50),
((SELECT season_id from seasons WHERE year=2013), (SELECT team_id FROM teams WHERE last_name='Klein'), -50),
((SELECT season_id from seasons WHERE year=2013), (SELECT team_id FROM teams WHERE last_name='Timmer'), -50),
((SELECT season_id from seasons WHERE year=2013), (SELECT team_id FROM teams WHERE last_name='Miller'), -50),
((SELECT season_id from seasons WHERE year=2013), (SELECT team_id FROM teams WHERE last_name='Zoerhof'), -50),
((SELECT season_id from seasons WHERE year=2013), (SELECT team_id FROM teams WHERE last_name='Friedman'), -50),
((SELECT season_id from seasons WHERE year=2013), (SELECT team_id FROM teams WHERE last_name='Friedman'), 400),
((SELECT season_id from seasons WHERE year=2013), (SELECT team_id FROM teams WHERE last_name='Bolton'), 200),

((SELECT season_id from seasons WHERE year=2012), (SELECT team_id FROM teams WHERE last_name='Maziar'), -50),
((SELECT season_id from seasons WHERE year=2012), (SELECT team_id FROM teams WHERE last_name='Bolton'), -50),
((SELECT season_id from seasons WHERE year=2012), (SELECT team_id FROM teams WHERE last_name='Colville'), -50),
((SELECT season_id from seasons WHERE year=2012), (SELECT team_id FROM teams WHERE last_name='Kaafrani'), -50),
((SELECT season_id from seasons WHERE year=2012), (SELECT team_id FROM teams WHERE last_name='Tinkle'), -50),
((SELECT season_id from seasons WHERE year=2012), (SELECT team_id FROM teams WHERE last_name='Gatt'), -50),
((SELECT season_id from seasons WHERE year=2012), (SELECT team_id FROM teams WHERE last_name='Cobert'), -50),
((SELECT season_id from seasons WHERE year=2012), (SELECT team_id FROM teams WHERE last_name='Klein'), -50),
((SELECT season_id from seasons WHERE year=2012), (SELECT team_id FROM teams WHERE last_name='Timmer'), -50),
((SELECT season_id from seasons WHERE year=2012), (SELECT team_id FROM teams WHERE last_name='Miller'), -50),
((SELECT season_id from seasons WHERE year=2012), (SELECT team_id FROM teams WHERE last_name='Benfield'), -50),
((SELECT season_id from seasons WHERE year=2012), (SELECT team_id FROM teams WHERE last_name='Friedman'), -50),
((SELECT season_id from seasons WHERE year=2012), (SELECT team_id FROM teams WHERE last_name='Bolton'), 400),
((SELECT season_id from seasons WHERE year=2012), (SELECT team_id FROM teams WHERE last_name='Klein'), 200),

((SELECT season_id from seasons WHERE year=2011), (SELECT team_id FROM teams WHERE last_name='Maziar'), -50),
((SELECT season_id from seasons WHERE year=2011), (SELECT team_id FROM teams WHERE last_name='Ackerman'), -50),
((SELECT season_id from seasons WHERE year=2011), (SELECT team_id FROM teams WHERE last_name='Colville'), -50),
((SELECT season_id from seasons WHERE year=2011), (SELECT team_id FROM teams WHERE last_name='Demery'), -50),
((SELECT season_id from seasons WHERE year=2011), (SELECT team_id FROM teams WHERE last_name='Tinkle'), -50),
((SELECT season_id from seasons WHERE year=2011), (SELECT team_id FROM teams WHERE last_name='Gatt'), -50),
((SELECT season_id from seasons WHERE year=2011), (SELECT team_id FROM teams WHERE last_name='Cobert'), -50),
((SELECT season_id from seasons WHERE year=2011), (SELECT team_id FROM teams WHERE last_name='Klein'), -50),
((SELECT season_id from seasons WHERE year=2011), (SELECT team_id FROM teams WHERE last_name='Habshoosh'), -50),
((SELECT season_id from seasons WHERE year=2011), (SELECT team_id FROM teams WHERE last_name='Goldstein'), -50),
((SELECT season_id from seasons WHERE year=2011), (SELECT team_id FROM teams WHERE last_name='Peters'), -50),
((SELECT season_id from seasons WHERE year=2011), (SELECT team_id FROM teams WHERE last_name='Friedman'), -50),
((SELECT season_id from seasons WHERE year=2011), (SELECT team_id FROM teams WHERE last_name='Gatt'), 400),
((SELECT season_id from seasons WHERE year=2011), (SELECT team_id FROM teams WHERE last_name='Klein'), 200),

((SELECT season_id from seasons WHERE year=2010), (SELECT team_id FROM teams WHERE last_name='Maziar'), -50),
((SELECT season_id from seasons WHERE year=2010), (SELECT team_id FROM teams WHERE last_name='Ackerman'), -50),
((SELECT season_id from seasons WHERE year=2010), (SELECT team_id FROM teams WHERE last_name='Colville'), -50),
((SELECT season_id from seasons WHERE year=2010), (SELECT team_id FROM teams WHERE last_name='Kaafrani'), -50),
((SELECT season_id from seasons WHERE year=2010), (SELECT team_id FROM teams WHERE last_name='Tinkle'), -50),
((SELECT season_id from seasons WHERE year=2010), (SELECT team_id FROM teams WHERE last_name='Gatt'), -50),
((SELECT season_id from seasons WHERE year=2010), (SELECT team_id FROM teams WHERE last_name='Cobert'), -50),
((SELECT season_id from seasons WHERE year=2010), (SELECT team_id FROM teams WHERE last_name='Klein'), -50),
((SELECT season_id from seasons WHERE year=2010), (SELECT team_id FROM teams WHERE last_name='Peters'), -50),
((SELECT season_id from seasons WHERE year=2010), (SELECT team_id FROM teams WHERE last_name='Tenenbaum'), -50),
((SELECT season_id from seasons WHERE year=2010), (SELECT team_id FROM teams WHERE last_name='Patel'), -50),
((SELECT season_id from seasons WHERE year=2010), (SELECT team_id FROM teams WHERE last_name='Friedman'), -50),
((SELECT season_id from seasons WHERE year=2010), (SELECT team_id FROM teams WHERE last_name='Cobert'), 400),
((SELECT season_id from seasons WHERE year=2010), (SELECT team_id FROM teams WHERE last_name='Colville'), 200);

-- Insert Into Matchup - Need many more values:
INSERT INTO matchups (season_id, week, home_team_id, away_team_id, home_team_score, away_team_score) VALUES
((SELECT season_id FROM seasons WHERE year=2019), (1), (SELECT team_id FROM teams WHERE last_name='Bolton'),(SELECT team_id FROM teams WHERE last_name='Goncalves'), (123.6), (107.34)),
((SELECT season_id FROM seasons WHERE year=2019), (1), (SELECT team_id FROM teams WHERE last_name='Gatt'),(SELECT team_id FROM teams WHERE last_name='Cobert'), (94.02), (63.74)),
((SELECT season_id FROM seasons WHERE year=2019), (1), (SELECT team_id FROM teams WHERE last_name='Maziar'),(SELECT team_id FROM teams WHERE last_name='Kunkel'), (125.22), (99.52));
