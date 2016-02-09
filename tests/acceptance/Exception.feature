Feature: Exception
  As a developer
  I want to throw errors and log them
  In order to guard app errors

  Scenario: Can throw/catch/log exceptions
    Given I have route that throws 'ServerErrorException'
    When I visit this route
    Then I see error in response
    And I should see error logged
