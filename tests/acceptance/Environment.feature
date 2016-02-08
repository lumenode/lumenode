Feature: Environment
  As a developer
  I want to define configuration via environment variables
  In order to configure application

  Scenario: Can read config
    Given I started application
    When I am trying to read environment configuraion
    Then I should see some environment variables
