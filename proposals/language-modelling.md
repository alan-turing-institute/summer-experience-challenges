# Language Modelling

## Summary

Build your own AI language models! Students will learn how to collect your own text-based data, and use it to fine-tune openly available language models that have been pre-trained on large amounts of text from the internet. Students then get to try applying them in different contexts: generating horoscopes [text generation], classifying movie reviews [text classification], and whatever else they can think of within some set guidelines.

## Learning themes and outcomes

*Theme:* Language modelling

*Outcomes:*

1. Gain a high-level understanding of what a language model is and to get an overview of popular generative AI tools (like ChatGPT, Dall-e, Midjourney).
2. Provide exposure to popular language model implementations (Huggingface) to see how we can train and perform inference with openly available models.
3. Learn the concept of fine-tuning, and how you can make the same model wear many different hats for different tasks (classification, generation, filling in masks)
4. Apply this concept to a given example, which students can still play with after the sessions
5. Learn about the new paradigm of "prompt engineering" with a security emphasis: e.g. how these language models can go beyond their safeguards, how that allows them to be misused, and what can be done to mitigate these risks.

## Overview of sessions + intended delivery

*Monday*: 5 minute video pitch describing the general structure of the challenge.

*Thursday* (1.5h):
 - Introduction (30 min): Discussion of generative AI with a focus on language modelling and NLP.
#### fine-tuning language models
 - Fine-tuning session (1h -- going through notebook, show our results, give task, collecting and sharing results, improving)
 - Leave open the possible tasks you could do next, reflect on for next session

*Friday* (1.5h):
- Possible extra fine-tuning session, but with more free reign (45min? reinforce concepts, scrape data)
#### prompt injection (45 min?)
- [the original "Ignore all instructions"](https://www.aiweirdness.com/ignore-all-previous-instructions/)
- pose to class: is this bad?
    - how could this be misused?
    - collect ideas (pair up for 5 mins?)
- indirect prompt injection: [leaving messages on your wiki page for Bing](https://twitter.com/random_walker/status/1636923058370891778)
- how could we protect against this?
    - collect ideas again (5 minutes in pairs)
    - A: it's an open problem. in some ways, if the model exists with these capabilities, it's hard to totally stifle them. (needs more research!)
    - if this is something that inspires you, pursue it -- probably very important in the coming years!
- what about the ethics of large, powerful models in general? 
    - could set restrictions on companies with models, but legally very perplexing (e.g. there's a distinguishment to be made between the "model" [bunch of numbers] and "AI system" [application that *uses* the model in a particular context]), so pointing fingers to blame people is not necessarily straightforward

All timings within main sessions are approximate.

## Opportunities for Collaboration

For the fine-tuning part of the challenge, participants will be running code on Colab notebooks that have been set up for them. Participants can work in smaller groups, where different sub-tasks (data collection, researching models, choosing tasks, playing with hyperparameters) can be 

## Development plan

### What *has* been done
- General themes + challenges have been decided on 
- Made a [codeless notebook for fine-tuning](https://colab.research.google.com/drive/1qB6F9l1p7JxgYlcz6Gj7Q_EwgK2qUa10?usp=sharing) in the context of text generation
    - Students fine-tune a language model, e.g. [distilgpt2](https://huggingface.co/distilgpt2), on a dataset that can either be provided by us or scraped by them.
    - They then will upload this to the huggingface hub (we should provide accounts or tell them to make one), and they can play with the output
- Found some good icebreakers (go play for ten minutes and upload results to a public space etc):
    - https://huggingface.co/spaces/stabilityai/stable-diffusion (stable diffusion, no setup)
    - [text-to-pokemon](https://replicate.com/lambdal/text-to-pokemon)
    - [Novel AI](https://novelai.net/stories?id=6342d505-5484-423a-bde1-96df4ec5ef17


### What *has yet* to be done
- Expansion of fine-tuning notebook to other modalities (text classification etc)
- A well-trained example version of this notebook from our side that does someting cool
- Come up with a prompt engineering task
    - initial idea: here's a model to accept a prompt, here's a task -- come up with the best result (e.g. write a story involving x, y, z, but in this style?)
        - dependent on the availability of that resource
    - could do something trickier like: here's a prompt for chatgpt. edit it such that it ignores the task and does something different, like print the word "dog"
        - this is technically a gateway to make it do more explicit things, but I'd rather give the benefit of the doubt to the students here -- anything shown can be centralized by a facilitator


## Development time

_An estimate of how long it will take to prepare the challenge_

Probably approximately 1 FTE-month.

## Questions/risks

- From our implementations, there is a risk that the fine-tuned language model will return profanity, but we can possibly add some checks and safeguard this from happening.
- Well-known that ChatGPT can generate _questionable_ material that might not be appropriate for students...
- If we wanted it, how to get students priority access to ChatGPT? Is there a budget for buying a subscription for the challenge so there is no queue?
- If we allow students to find text data online, how do we ensure that the fine-tuned model doesn't return inappropriate results?

We should discuss this challenge with the Ethics team to ensure that we minimise the risks associated with this challenge.


