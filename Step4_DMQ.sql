/* Over the weekend the team has pivoted to a fantasty football stat tracking for our league that has been running for 10 years. We are in the middle of redefining the HTML structure and how the data will be presented. We believe we have the DDQ pretty well defined, we now need to finish these queries 
NOTE: Some Queries are pseudocode code/ text steps until the team can define exactly how the data will be presented.
*/

-- Query to add in a new matchup for the given year (Admin Page)
INSERT INTO matchups (season_id, week, home_team_id, away_team_id, home_team_score, away_team_score) VALUES
((SELECT season_id FROM seasons WHERE year=:), (:), (SELECT team_id FROM teams WHERE last_name=':'),(SELECT team_id FROM teams WHERE last_name=':'), (:home_team_score), (:away_team_score));

-- Query to add new member to league (Admin Page)
INSERT INTO teams (first_name, last_name, active_member) VALUES
(':first_name', ':last_name', 1)

-- Query For Overall record for selected player (Teams Page)
1. Create sub-table of matchups for given player / year selected? 
2. Split Sub Table by if the team_id is home or away_team_id
3. Count how many times the home / away team outscored thier opponents
4. Add values 


-- Query For Overall Standings (Standings Page)
Use query above for every player in the teams table

-- Query For Matchups (Scoreboard Page)
SELECT * FROM Matchups WHERE team_id = ":TEAM1" AND team_id = ":TEAM2"