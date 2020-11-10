/*
 * Copyright (C) 2020 Intel Corporation
 *
 * SPDX-License-Identifier: MIT
 */

/// <reference types="cypress" />

import { taskName, labelName } from '../../support/const';

context('Actions on points', () => {
    const caseId = '12';
    const newLabelName = `New label for case ${caseId}`;
    const createPointsShape = {
        type: 'Shape',
        switchLabel: false,
        pointsMap: [
            { x: 200, y: 200 },
            { x: 250, y: 200 },
            { x: 250, y: 250 },
        ],
        complete: true,
        numberOfPoints: null,
    };
    const createPointsTrack = {
        type: 'Track',
        switchLabel: false,
        pointsMap: [
            { x: 300, y: 200 },
            { x: 350, y: 200 },
            { x: 350, y: 350 },
        ],
        complete: true,
        numberOfPoints: null,
    };
    const createPointsShapePoints = {
        type: 'Shape',
        switchLabel: false,
        pointsMap: [
            { x: 400, y: 200 },
            { x: 450, y: 200 },
            { x: 450, y: 250 },
            { x: 400, y: 350 },
            { x: 380, y: 330 },
        ],
        numberOfPoints: 5,
    };
    const createPointsTrackPoints = {
        type: 'Track',
        switchLabel: false,
        pointsMap: [
            { x: 500, y: 200 },
            { x: 550, y: 200 },
            { x: 550, y: 250 },
            { x: 500, y: 350 },
            { x: 480, y: 330 },
        ],
        numberOfPoints: 5,
    };
    const createPointsShapeSwitchLabel = {
        type: 'Shape',
        switchLabel: true,
        labelName: newLabelName,
        pointsMap: [
            { x: 600, y: 200 },
            { x: 650, y: 200 },
            { x: 650, y: 250 },
        ],
        complete: true,
        numberOfPoints: null,
    };
    const createPointsTrackSwitchLabel = {
        type: 'Track',
        switchLabel: true,
        labelName: newLabelName,
        pointsMap: [
            { x: 700, y: 200 },
            { x: 750, y: 200 },
            { x: 750, y: 250 },
        ],
        complete: true,
        numberOfPoints: null,
    };

    before(() => {
        cy.openTask(taskName);
    });

    describe(`Testing case "${caseId}"`, () => {
        it('Add new label', () => {
            cy.contains('button', 'Add label').click();
            cy.get('[placeholder="Label name"]').type(newLabelName);
            cy.contains('button', 'Done').click();
        });
        it('Open a job', () => {
            cy.openJob();
        });
        it('Draw a points shape, track', () => {
            cy.createPoint(createPointsShape);
            cy.createPoint(createPointsTrack);
        });
        it('Draw a points shape, track with use parameter "number of points"', () => {
            cy.createPoint(createPointsShapePoints);
            cy.createPoint(createPointsTrackPoints);
        });
        it('Draw a points shape, track with second label', () => {
            cy.createPoint(createPointsShapeSwitchLabel);
            cy.createPoint(createPointsTrackSwitchLabel);
        });
    });
});
