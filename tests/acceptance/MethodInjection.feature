Feature: Method Injection
  As a developer
  I want to auto inject services into methods
  In order to use application services easely

  Scenario: Can inject configuration service into controller method
    Given I started application
    And I have 'Config' service
    And I have a route '/config' that uses 'Config' service
    When I navigate to the '/config' url
    Then I should see application config
