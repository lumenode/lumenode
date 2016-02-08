Feature: Logs
  As a developer
  I want to be able to write messages to logs and reports
  In order to debug application

  Scenario: Can write logs
    Given I do not have any logs
    When I log some 'message'
    Then I should see that 'message' in the log file
