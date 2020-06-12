-- Select all teams
SELECT * FROM teams;

-- Insert a team
INSERT INTO teams (`first_name`, `last_name`, `active_member`) 
VALUES (:first_name, :last_name, :active_member);

-- Update a team
UPDATE teams SET first_name=:first_name, last_name=:last_name, 
active_member=:active_member WHERE team_id=:team_id;

-- Delete a team
DELETE FROM teams WHERE team_id=:team_id;

-- Select all seasons
SELECT * FROM season;

-- Load Seasons for dropdown
SELECT season_id, year FROM seasons;

-- Insert a season
INSERT INTO seasons (`year`, `championship_team_id`, `runner_up_id`) 
VALUES (:year, :championship_team_id, :runner_up_id);

-- Select all season teams
SELECT * FROM season_teams;

-- Insert a season team
INSERT INTO season_teams (`season_id`, `team_id`, `made_playoffs`, `wins`, `losses`, `ties`, `points_scored`, `points_against`) 
VALUES (:season_id, :team_id, :made_playoffs, :wins, :losses, :ties, :points_scored, :points_against);

-- Select all dues
SELECT * FROM league_dues;

-- Insert a league due
INSERT INTO league_dues (`season_id`, `team_id`, `amount`) 
VALUES (:season_id, :team_id, :amount);

-- Select all matchups
SELECT * FROM matchups;

-- Insert a matchup
INSERT INTO matchups (`season_id`, `week`, `home_team_id`, `away_team_id`, `home_team_score`, `away_team_score`) 
VALUES (:season_id, :week, :home_team_id, :away_team_id, :home_team_score, :away_team_score);

-- Load winnings for winnings page
SELECT first_name as 'First Name', last_name as 'Last Name', sum(amount) as Winnings from league_dues ld
JOIN teams t ON t.team_id = ld.team_id
GROUP BY 1,2
ORDER BY Winnings DESC;

-- Load team names in dropdown
SELECT team_id, last_name FROM teams

-- Select a table of records based on the name selected in the drop down
SELECT year as 'Year', wins as 'Wins', losses as "Losses", ties as "Ties", 
points_scored as "Points Scored", points_against as "Points Against", 
made_playoffs as "Made Playoffs" from season_teams st
JOIN seasons s ON s.season_id = st.season_id
WHERE team_id = :team_id;

--Select correct columns for standings page
select first_name as 'First Name', last_name as 'Last Name', sum(wins) as Wins, sum(losses) as Losses, sum(ties) as Ties,
CONCAT(CAST((sum(wins)*100/sum(wins+losses+ties)) AS CHAR(5)),'%') as WinningPct,
sum(made_playoffs) as 'Playoff Appearances' from season_teams st
JOIN teams t ON t.team_id = st.team_id
GROUP BY 1,2
ORDER BY Wins DESC, WinningPct DESC;

-- Select all matchups between two selected teams


