Feature: Guardian Validation

    Scenario: Approve valid recommendation
        Given a valid guardian request
        When I send it to the Guardian API
        Then the response should be approved

    Scenario: Reject invalid recommendation
        Given a guardian request with violations
        When I send it to the Guardian API
        Then the response should be rejected