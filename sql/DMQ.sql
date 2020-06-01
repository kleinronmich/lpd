/* Over the weekend the team has pivoted to a fantasty football stat tracking for our league that has been running for 10 years. We are in the middle of redefining the HTML structure and how the data will be presented. We believe we have the DDQ pretty well defined, we now need to finish these queries 
*/

-- Query to add in a new matchup for the given year (Admin Page)
INSERT INTO matchups (season_id, week, home_team_id, away_team_id, home_team_score, away_team_score) VALUES
((SELECT season_id FROM seasons WHERE year=:), (:), (SELECT team_id FROM teams WHERE last_name=':'),(SELECT team_id FROM teams WHERE last_name=':'), (:home_team_score), (:away_team_score));

-- Query to add new member to league (Admin Page - Create Functionality Step 5)
INSERT INTO teams (first_name, last_name, active_member) VALUES
(':first_name', ':last_name', 1)

-- Query For Overall record for selected player (Teams Page)
-- Can do query for each data type needed 
SELECT SUM ('wins')
FROM Season_Teams 
WHERE team_id = :

-- Query for record by Year by team (teams page)
SELECT *
FROM Season_Teams
WHERE team_id = : AND season_id = :;


-- Query For Matchups (Scoreboard Page)
SELECT * FROM Matchups WHERE team_id = ":TEAM1" AND team_id = ":TEAM2"


-- Query to Change a Game (Update Functionality Step 6)

-- Query to Delete a Game (DELETE Functionality Step 6)