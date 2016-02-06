Feature: Pages
  As a developer
  I want to open pages
  In order to test endpoints

  Scenario: Can open home page
    Given I started application
    When I visit 'home' page
    Then I should see 'Hi, there.' heading
