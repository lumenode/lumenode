Feature: Emulator Page
  As a QA/BA/PO/Developer/Human
  I want to send fake/emulated xmls to the PC
  In order to test PC functinal

  Scenario: Can open emulator page
    Given I started application
    When I visit 'home' page
    Then I should see some inputs and buttons in order to send XML for different events