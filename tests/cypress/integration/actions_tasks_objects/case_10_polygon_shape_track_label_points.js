/*
 * Copyright (C) 2020 Intel Corporation
 *
 * SPDX-License-Identifier: MIT
 */

/// <reference types="cypress" />

import { taskName, labelName } from '../../support/const';

context('Actions on polygon', () => {
    const caseId = '10';
    const newLabelName = `New label for case ${caseId}`;
    const createPolygonShape = {
        reDraw: false,
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
    const createPolygonTrack = {
        reDraw: false,
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
    const createPolygonShapePoints = {
        reDraw: false,
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
    const createPolygonTrackPoints = {
        reDraw: false,
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
    const createPolygonShapeSwitchLabel = {
        reDraw: false,
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
    const createPolygonTrackSwitchLabel = {
        reDraw: false,
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
        it('Draw a polygon shape, track', () => {
            cy.createPolygon(createPolygonShape);
            cy.createPolygon(createPolygonTrack);
        });
        it('Draw a polygon shape, track with use parameter "number of points"', () => {
            cy.createPolygon(createPolygonShapePoints);
            cy.createPolygon(createPolygonTrackPoints);
        });
        it('Draw a polygon shape, track with second label', () => {
            cy.createPolygon(createPolygonShapeSwitchLabel);
            cy.createPolygon(createPolygonTrackSwitchLabel);
        });
    });
});
