# Air Quality API
A REST API responsible for exposing “the air quality information” of the nearest city to GPS coordinates using iqair.

## Getting Started

To run the program, follow these steps:

1. Clone this repository to your local machine or download zip file.
1. Run the program using `docker compose up`.
Run with docker automatically start cron job

Or run it manually:
1. `npm install`
1. `npm run start:dev`

To run cron job, run `npm run cron:start`
To stop cron job, run `npm run cron:stop`


## Running Tests
To run the tests, use the command `docker compose -f docker-compose.test.yml up`.

Or run it manually:
1. `npm install`
1. `npm run test`


## Assumptions and Trade-Offs

The program assumes that that ou have correct value in your .env file as described in the `env.example` file.

Due to time constraints, some features have been deprioritized, including:

* spin up a new child process to run CronJob
* optional task
