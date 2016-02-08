Feature: Pages
  As a developer
  I want to define configuration with '/config' folder
  In order to configure application

  Scenario: Can read config
    Given I started application
    When I am trying to read global configuraion
    Then I should see some config variables

  Scenario: Can set config
    Given I started application
    When I am trying to set 'foo' key with 'bar' value
    Then I should see 'foo' key and 'bar' value