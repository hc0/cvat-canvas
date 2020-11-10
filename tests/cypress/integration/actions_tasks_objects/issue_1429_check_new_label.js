/*
 * Copyright (C) 2020 Intel Corporation
 *
 * SPDX-License-Identifier: MIT
 */

/// <reference types="cypress" />

import { taskName } from '../../support/const';

context('Check if the new label reflects in the options', () => {
    const issueId = '1429';
    const labelName = `Issue ${issueId}`;
    const newLabelName = `New ${labelName}`;
    const createRectangleShape2Points = {
        points: 'By 2 Points',
        type: 'Shape',
        switchLabel: false,
        firstX: 250,
        firstY: 350,
        secondX: 350,
        secondY: 450,
    };

    before(() => {
        cy.openTaskJob(taskName);
    });

    describe(`Testing issue "${issueId}"`, () => {
        it('Return to task page using browser button "previous page"', () => {
            cy.go('back');
            cy.url().should('include', '/tasks').and('not.contain', '/jobs');
        });
        it('Add new label', () => {
            cy.contains('button', 'Add label').click();
            cy.get('[placeholder="Label name"]').type(newLabelName);
            cy.contains('button', 'Done').click();
        });
        it('Open the job again', () => {
            cy.openJob();
        });
        it('Create a rectangle shape', () => {
            cy.createRectangle(createRectangleShape2Points);
        });
        it('Checking for the new label', () => {
            cy.get('#cvat-objects-sidebar-state-item-1').find('.ant-select-selection').click();
            cy.get('.ant-select-dropdown-menu-item').should('contain', newLabelName);
        });
    });
});
