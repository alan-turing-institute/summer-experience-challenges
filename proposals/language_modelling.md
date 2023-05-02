# Language Modelling

## Summary

This challenge aims to give participants experience with working with generative AI models (for language modelling).

## Learning themes and outcomes

*Theme:* Language modelling

*Outcomes:*

1. Gain a high-level understanding of what a language model is and to get an overview of popular generative AI tools (like ChatGPT, Dall-e, Midjourney).

2. Provide exposure to popular Python implementations (Huggingface) to see how we can train and perform inference with language models.

3. Understand the impact of biases in training data in language models, and how it can impact our society.

4. Learn about "prompt engineering" with an emphasis on how these language models can be misused by bad actors, and what can be done to mitigate these risks.

## Sessions

*Monday*: 5 minute video pitch describing the general structure of the challenge.

*Thursday*:
 - Introduction (30 min): Discussion of generative AI with a focus on language modelling and NLP.
 - Fine-tuning session

*Friday*:
 - Prompt engineering session

All timings within main sessions are approximate.

## Opportunities for Collaboration

For the fine-tuning part of the challenge, participants will be running code on Colab notebooks that have been set up for them. Participants can work in smaller groups.

## Development plan

- Prepare the script, slides, and videos required per session:
- Develop Colab notebook for fine-tuning session:
  - Load in a pre-trained model, e.g. [distilgpt2](https://huggingface.co/distilgpt2) and fine-tune the model to some data.
  - Students can either choose from a list of datasets that we've found, or possibly find some data elsewhere.
  - Use [Colab Forms](https://colab.research.google.com/notebooks/forms.ipynb) in order to hide long sections of code from students to have a simple user-interface.
  - Allow students to simply run sections of code (with a few sections where they might need to copy & paste or complete some lines of code).
  - Upload fine-tuned model to Huggingface where they can perform inference, e.g. [ds-summer-school-seinfeld](https://huggingface.co/rchan26/ds-summer-school-seinfeld?text=JERRY%3A+It%27s+nice+to+meet+you%2C+I%27m)
- Search for appropriate datasets for students to work with in the challenge.
- Develop session plan for prompt engineering with ChatGPT.

## Development time

_An estimate of how long it will take to prepare the challenge_

Probably approximately 1 FTE-month.

## Delivery plan


## Questions/risks

- From our implementations, there is a risk that the fine-tuned language model will return profanity, but we can possibly add some checks and safeguard this.
- Well known that ChatGPT can generate _questionable_ material that might not be appropriate for students.
- How do get students access to ChatGPT? Is there a budget for buying a subscription for the challenge so there is no queue?
- If we allow students to find text data online, how do we ensure that the fine-tuned model doesn't return inappropriate results?
- We should discuss this challenge with the Ethics team to ensure that we minimise the risks associated with this challenge.
