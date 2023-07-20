# Cryptography

## Summary

This challenge aims to teach participants both traditional and modern encryption algorithms, using traditional exercise-based lessons as well as fun activities.

## Learning themes and outcomes

*Theme:* Cryptography

*Outcomes:*

1. Learn about traditional symmetric substitution ciphers and some ways in which they may be attacked.

2. Explore the modern RSA asymmetric encryption scheme to see how one-way problems can be used to provide security.

3. Gain an appreciation for the use of cryptography in real-life applications and communications.


## Sessions

*Monday*: 5 minute video pitch describing the general structure of the challenge.

*Thursday*:
 - Introduction (30 min): Discussion of the role of cryptography in modern society, including historical examples and other real-life contexts.
 - Session 1 (90 min): *Symmetric encryption.*
   - 40 min: Interactive exercises / worksheets on: Caesar and Vigenere ciphers; ways to crack substitution ciphers (frequency analysis, chosen plaintext attacks, index of coincidence, etc.)
   - 10 min: Brief discussion of Enigma cipher, transposition ciphers, and AES: encryption schemes can be covered, but decryption is likely not possible given the time constraints (although we can emphasise that it is a generalisation of those seen previously).
   - 25 min: Some kind of game, or activity that can have some demonstrable outcome which participants can use in their presentation.
   - 15 min: Time for participants to work on the presentation.

*Friday*:
 - Session 2 (90 min): *RSA encryption.*
   - 40 min: Introduction to some aspects of number theory, particular modular arithmetic.
   - 10 min: Discussion of the role of RSA in modern Internet communication.
   - 25 min: Some kind of game pitting an encryption team against a decryption team.
   - 10 min: Time for participants to work on their presentation.
 - Presentation (60 min across all groups)

All timings within main sessions are approximate.

## Opportunities for Collaboration

Because of the number of laptops available, participants will likely have to work in pairs for the 'lesson' parts.
There's also plenty of room in the 'game' sections for collaboration.
One possibility could be to work together to decrypt a long text, or a series of separate texts, in order to obtain different pieces of information which can be pieced together.

## Development plan

Tech needed: 

 - Website providing educational resources (either in the form of text / images / animations) on en-/decryption algorithms, as well as a way to practice this (perhaps using forms).
 - For the games: message passing between laptops (some kind of web server, it doesn't have to be overly complicated, as the messages themselves don't have to be private). In principle this can be done locally, but I think it'd be easier to do online. *[Actually, can we use something like Slack?]*
 - Facilitators probably need scripts / some way of 'quickly' break codes (to verify whether the participants are doing it correctly).

## Development time

_An estimate of how long it will take to prepare the challenge_

Probably approximately 1 FTE-month.

## Delivery plan

Students should need their laptops, but nothing more.

Facilitators need to understand the cryptography itself, which is probably the biggest hurdle — it can get a bit technical.

For the games, depending on the actual implementation, a board game might be required.

## Questions/risks

This challenge is more mathematical than the others.
I'm assuming this is not a huge problem because participants are supposed to be interested in maths(?)
However, it should definitely be mentioned when briefing the participants on the available challenges.
