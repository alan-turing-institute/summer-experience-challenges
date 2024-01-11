# Language Modelling: Student Handbook

<aside>
🔥 Welcome to the Language Model Mastery Challenge, where you'll embark on an exhilarating journey of fine-tuning your very own language model! Get ready to unleash your creativity as you dive into the vast sea of existing text and curate your own content to train your model. But that's not all! We'll also equip you with the skills to become a master prompter, enabling you to extract the full potential of ChatGPT-like models. And here comes the thrilling part: a virtual quest awaits as you attempt to breach the defenses of a language model through the art of prompt injection, unveiling a secret password hidden within its digital labyrinth. Brace yourself for an adventure that blends learning, hacking, and sheer enjoyment as you unlock the secrets of language models. Let the challenge begin!

</aside>

A review of this challenge from a friend:

![Untitled](images/Untitled.png)

---

### Useful things:

Form to submit prompts/outputs/whatever you like!

[Language Modelling](https://forms.gle/JZkm48dsPdMTLK2t6)


```
<hugging-face-token>
```

```
<open-ai-token>
```

---

# Section 1: ChatGPT and Prompt Engineering

I’m sure you’ve all heard of ChatGPT by now (play with it at [chat.openai.com](http://chat.openai.com) if not!). It’s a chatbot designed by OpenAI that can generate pretty impressive text output, just by asking it to — colourful haikus, full history essays, ASCII art, you name it. In fact, the wonderfully creative introduction to the challenge we’re doing today was written by asking ChatGPT this:

> *Write a brief introductory paragraph to a challenge about language models. This challenge involves: 
- Fine-tuning your own language model on both existing text and content of your choosing
- Learning how to prompt ChatGPT-like models more effectively
- Hacking into ChatGPT using prompt injection to reveal a secret password
Make it sound fun, but don't be too cringe.*
> 

(Not sure how well it did with the last instruction, but you get the idea)

This text used to generate output from a language model is called a ************prompt************. Despite how powerful these models are proving to be, they are totally at the mercy of the prompt — without one, they can’t predict an output!

The predictions made my large language models are **************************************hugely sensitive to the prompt context**************************************, meaning that the more information you provide, the more you can influence the way the model responds to things. Here’s a fun example.

## ChatGPT does not understand basic maths

You may perhaps assume that an AI model trained at the cost of millions of pounds would be able to perform simple multiplication?

I asked ChatGPT to perform a quick calculation with some random numbers, and I was surprised at just how badly it did.

Here’s the calculation in a calculator:

![Untitled](images/Untitled%201.png)

My first attempt with ChatGPT:

![Untitled](images/Untitled%202.png)

Huh, ok, that’s not right. Let’s use a known trick to ask it to show it’s working “step-by-step”, which generally produces more reliable results:

![Untitled](images/Untitled%203.png)

The working is right, but the first step is wrong! Maybe we just need to do some method acting?

![Untitled](images/Untitled%204.png)

Ok, so it’s very confident in it’s mistake, even as a maths genius. Maybe we need to give it more pressure.

![Untitled](images/Untitled%205.png)

Mathematical operations are a known weak point of language models, so I am being a bit mean here, but still! You can see that it’s much better at making things ******sound****** correct as opposed to using actual logic when computing the answers.

More recent models have been trained to be better at this, e.g. the new version of Google’s Bard chatbot:

![Untitled](images/Untitled%206.png)

### Task: Learn prompt engineering by example!

This resource is an amazing place to learn the basics of prompt engineering — the art of taming language models to properly execute instructions. Browse through the first category (*basics*) and play with some of the exercises. 

Note: you’ll need the *OpenAI API key* at the top of this document to click the “Generate” button in the code panels.

[Learn Prompting: Your Guide to Communicating with AI](https://learnprompting.org/docs/category/-basic-applications)

<aside>
❓ **************************************Question for reflection:************************************** What do you think language models could be used for in the real world? Come up with one idea per group!

</aside>

Here’s a pretty crazy example: using GPT-4 to literally play minecraft: 

[https://github.com/MineDojo/Voyager](https://github.com/MineDojo/Voyager)

The language model is writing *code* to perform tasks in minecraft, and then updates the code using feedback from minecraft itself! You could imagine this same feedback loop working in all sorts of different scenarios, where a model is gradually able to discover and learn things about a new problem, continuously refining its solution based on feedback delivered as prompts.

## Prompt injection

### Task: Play the Gandalf Game!

[https://gandalf.lakera.ai/](https://gandalf.lakera.ai/)

<aside>
💡 Make sure to *keep notes* of the prompts you use — if you get it right, **you’ll lose access to the prompt you wrote!!!**

</aside>

Need some help? Try looking through the prompt hacking section in the course — you may have thought of some of these methods already, but there’s plenty to try:

[Learn Prompting: Your Guide to Communicating with AI](https://learnprompting.org/docs/category/-prompt-hacking)

If you’re working in pairs — take turns being the typer!!

# Section 2: Fine-tuning a language model for text generation

In a sense, there’s a bit of magic that goes missing with powerful models like ChatGPT. They’re… too good. Too coherent. What can often be more fun to watch is when models start outputting pretty questionable things on their training journey. As an example, take a look at this blog post from 2019 on producing some very *interesting* cooking recipes using neural networks.

[https://www.aiweirdness.com/try-these-neural-network-generated-17-08-06/](https://www.aiweirdness.com/try-these-neural-network-generated-17-08-06/)

Think you can do better? We’re going to have a go ourselves!

### Task: Fine-tune your own language models!

Without writing ********any code********, using a Python notebook hosted on Google Colab, you will be able to:

- Fine-tune a model on an openly available dataset of recipes/reviews
- Play with the training parameters to see how they affect how well the model learns
- Collect your own data + train the model on that!

Here’s the link to the notebook:

[Google Colaboratory](https://colab.research.google.com/drive/1qB6F9l1p7JxgYlcz6Gj7Q_EwgK2qUa10?usp=sharing)

---

### Step 1: Getting started

Try running the first couple notebook cells! In Google Colab (the platform we’re using), a code cell looks like this:

![Untitled](images/Untitled%207.png)

<aside>
💡 If you’re curious about any of the code (written in Python), you can always click the **Show code** button to see what we’re doing!

</aside>

Notice how the code is hidden from view — we can still run it though! Running cells works by clicking the play button to the left of the cell (or you can press `Shift+Enter`). 

<aside>
❗ Stop when you reach the second cell — it requires you to paste a token in to log in to a platform called HuggingFace, the state of the art for storing models + datasets!

The token for our shared account is here (and also at the top of the page): `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`, which you can paste here:

![Untitled](images/Untitled%208.png)

If it worked, you should see this:

![Untitled](images/Untitled%209.png)

If you accidentally forget, you’ll get some error messages further on — you can come back to this cell and put the token in at any point, and if you run all the cells again, the error should go away!

</aside>

If you run everything after this point without changing anything, you probably will have already fine-tuned your own neural network! Though, you can probably see some of the cells take in text as input — you’re free to change this and customise things yourself. We’ll talk about the specific options in the next step, and how to adjust the parameters of the training procedure.

---

### Step 2: Models and datasets

The first thing you can control in the notebook is the model we use. This is probably not that interesting in the beginning, since you haven’t ran the notebook yet.

- I’d recommend staying with the `distilgpt2` option to start, but click this arrow on the left if you want to find a new model!
    
    So: there are all sorts of language models on HuggingFace, it’s pretty hard to know where to look! We’re doing the task of text generation in this example, so we can start by filtering the models to give us only those that have been trained with text generation in mind (though generally, you can specialise any of these models for many different tasks!) Go to this link to browse: 
    
    [Models - Hugging Face](https://huggingface.co/models?pipeline_tag=text-generation&sort=trending)
    
    The other restriction we have is that Google Colab has a limited amount of memory to load these models; to ensure any model you try fits into memory, I would recommend not choosing models above around 600MB in size, since the memory available isn’t that high. To see the model filesizes, you can click into the model, then browse to the “Files and versions” tab, where you’ll see a file called `pytorch_model.bin`, and a filesize next to it.
    
    ![Untitled](images/Untitled%2010.png)
    
    As long as you meet these requirements, your model of choice should work 🙂
    

After selecting the model, you’ll see a cell that invites you to give the model a prompt to work with. Change the text to whatever you like — the model will print its attempt to complete whatever you wrote! 

You also have the ability to control how many predictions the model makes, and the maximum number of new tokens (here, tokens = words, but that’s not always true — as an example, in some language models, tokens are individual characters).

Good results not guaranteed.

![Untitled](images/Untitled%2011.png)

Here’s another one I got sent from someone trying this out (sounds delicious 🥦🧊)

![Untitled](images/Untitled%2012.png)

The next thing in the notebook is the dataset choice. I’ve set it up to work best with a couple example datasets: one for recipes, and one for amazon reviews. You can choose one or the other through the dropdown menu:

![Untitled](images/Untitled%2013.png)

As a note: the amazon reviews data is *much larger* than the recipes. This will change the meaning of one **********epoch**********, which is one of the different parameters you can play with when starting the training.

<aside>
💡 Definition: A model has trained for one **********epoch********** when it has seen every data example once.

</aside>

---

*You’ll notice that the cell after this talks about uploading your own data — leave this for now, we’ll come back to it!*

---

After we select our dataset, we can have a look at what’s inside! The following cell will show a few  examples of training data, which is made up of multiple columns that contain different aspects about the data. It’s likely that only one some of these are related to the data you actually want to use. As an example, we may want to train a model to write short stories, and our dataset has a column for the date the story was published, as well as the story itself. We’re much more interested in showing a model examples of stories than we are a set of dates, so we should only include the stories!

You’ll have to make a similar decision here: for the datasets provided, there are a few columns to choose from — here, we’ll just select one to use for training. The cell to fill this in looks like this:

![Untitled](images/Untitled%2014.png)

---

### Step 3: Training the model

Now we’re at this cell:

![Untitled](images/Untitled%2015.png)

The first field controls the name of your model — this will be reflected on huggingface if you decide to upload this model later. I would recommend changing this!!

 For the other two parameters, we have:

- The **learning rate** (size of the steps that the model takes during training)
    - For some intuition here: training a model is like trying to push a ball down a hill, but there’s no gravity naturally pulling it down — it’s just stuck in place. This number controls how far one “push” will send the ball!
- **************************************************Number of epochs************************************************** that the model will train for

You can modify them by dragging the sliders left/right — the value you pick will be shown on the far-right hand side of the cell.

<aside>
❓ What do you think might happen if we make the learning rate too small? What about too large? Likewise, do you think we can train for too many/too few epochs? Make a note of your thoughts — we’ll come back to this soon!

</aside>

After you’ve done this, we’re now ready to train the model! How, you may ask?

![Untitled](images/Untitled%2016.png)

Click that — watch the magic happen live :) 

It’s possible that this may take a while, e.g. here’s my cell running most of the way through three epochs of the recipes data. You can see that it’s taken 25 minutes, with about 4 minutes remaining; half an hour-ish in total.

![Untitled](images/Untitled%2017.png)

Initially, you can start with a very small number of examples (e.g. 0.3 epochs) to get some results, but if you want to do a longer run, and you’ve done everything else, you can read ahead a bit (or maybe go back to the Gandalf game in the meantime while you wait 🪄)

---

### Step 4: Evaluating the output

**Perplexity**

You’ll notice we skipped a cell talking about the **************perplexity************** of the model. We can think of perplexity as a measure of how confident the model is in its outputs, with lower perplexity meaning the model is more sure of its predictions. More technically, if the model predictions for each word were actually a random sample from a set of words, then the perplexity is the average size of that set of words!

You can evaluate the perplexity before and after training using the cells in the notebook. Hopefully, the perplexity will almost certainly decrease after you’ve done some training, which means that the model is able to more confidently predict the next token (= character or word depending on which model you pick) in examples that you’ve given it.

- Click for a quick note on something bad I did with perplexity 😬
    
    I’ve set it up such that the perplexity in most cases is calculated based on a small subset of the example dataset you train on. This is *************not good practice from me!************* What one should really do is ******************explicitly remove some of the data****************** from the training set. We call this the **validation set**, because we literally use it to validate the model is working well on data it hasn’t seen before. Indeed, you will have also seen “Training loss” and “Validation loss” while training — both of these are actually training data because of my code. 
    
    If this was real life, we would also make a third partition of the data called the ****************test set****************, which is never ever used until the last possible moment, and is the final number you report for the model’s true performance — you wouldn’t want to tune your model to get the best results if you can see the answers, that’s technically cheating (and not good science).
    
    So why didn’t I set this up properly? Main reason is that sometimes there’s not enough data to make a meaningful validation set (then you have to do [cross-validation](https://scikit-learn.org/stable/modules/cross_validation.html) to pick the best model, which is definitely overkill for a simple demo). We’re only using these models to test we can generate text that seems like it’s roughly from some examples you give it, and as a hand-wavy metric, the perplexity of the training data will indicate that you have learned ***********something.*********** It’s more useful here for sanity checking that it decreases after training (as well as introducing you to the quantity — it’s used all over the place!)
    

**Generating text**

Another way to evaluate the model (and arguably more fun) is to generate new examples!
You’ll see a cell that’s just like the previous one we used to generate text, but this time it will use the model you’ve trained. 

- Here’s an example recipe I got from training on 1 epoch of the recipe data:
    
    My prompt is in blue, and the model text is in orange.
    
    Recipe for paella: roasted chicken
    
    Description: juicy asian style roasted chicken with red bell peppers, sunflower seeds, corn, red onion, soy sauce, fish sauce, water, sesame oil
    
    Ingredients:
    1.0 red bell pepper, 0.2 cup sunflower seeds, 0.2 cup corn, 0.2 cup red onion, 3.0 tablespoon soy sauce, 0.2 red onion, 1.5 cup soy sauce, 0.2 pound fish sauce, 2.0 sesame oil, 0.5 cup fish sauce, salt
    
    Steps:
    in a small sauce pan, combine chicken, beans, garlic, sesame oil, soy sauce, garlic and sesame oil. roast until hot, turning chicken on grill on middle rack of oven until heated through. preheat oven to 325degf. add cooked side up. transfer chicken to a rack and keep warm over medium heat. drizzle with oil. season with a few tablespoons of hot, cover and place chicken. cook 7 minutes, turning slightly reduce heat to medium high heat and cook, stirring occasionally, season with red bell pepper. remove chicken. add sesame oil to pan and sear 6 more than broil 8 toasted chicken, stirring
    

---

### Reflections — note these down!

- What happened to the perplexity when you trained on the recipes?
- Did you get good quality predictions?
- How did both of the above change with number of epochs and learning rate?
- What happens when you enter a prompt *not about the subject matter* in the training data to the trained model?
    - Click to reveal some examples I found when training on the recipes dataset…
        
        Original prompt:
        
        > Hi! My name is
        > 
        
        Prediction 1: *Ursa moves into the kitchen*
        
        > Hi! My name is ursa, my family uses to my kitchen, and we plan to find a new home there. i'm sorry if the kitchen seems too overwhelming, this may be the reason, it is actually impossible, since there is no substitute. i would substitute the "cream" option, but don't you just want to get into it. we just want to give a little bit of our own back in
        > 
        
        Prediction 2: *Ian gives us his bio*
        
        > Hi! My name is ian. i love my honey, mccormick rosemary root, and honey mustard, so i've been looking for a great honey solution that's just right
        
        Ingredients:asta cream cheese, 0.5 cup milk, 3.0 eggs, 0.2 cup water, 2.0 tablespoon grated lemon zest, 0.2 teaspoon garlic salt, 0.2 cup gran
        > 
        
        Prediction 3: *Ianna is made of 1 pound old flame story*
        
        > Hi! My name is ianna j, ia i'm going back with an old flame story, ia j' got a new favorite recipe and love it i try it a few times to see how new i can get right
        
        Ingredients:
        1.0 pound old flame story story pork tenderloin with lean ground pork, 50.0 gram red chili peppers, 0.2 onion, 0.2
        > 
        
        Prediction 4: *Ika should probably meet Ian*
        
        > Hi! My name is ika and i are a very sweet vegetarian vegetarian with chives, garlic, chili powder and fresh herbs such as rosemary, sage and honey. i'm glad you found me right here, but thanks to you guys all over
        
        Ingredients:
        1.0 pound ground beef, 2.0 tablespoon olive oil, 2.0 tablespoon butter, 1.0 teaspoon rice vinegar, 1.0
        > 
        
        (model = gpt, learning rate = 0.000381, num_train_epochs = 0.4)
        
    - Here’s another one that definitely makes sense from experience:
        
        ![Untitled](images/Untitled%2018.png)
        

---

### Step 5: Using your own data!

There are a couple of ways to go about this next step, which involves finding your own data to fine-tune on:

**Using huggingface datasets**

You may have seen that you can type whatever you want into this box:

![Untitled](images/Untitled%2019.png)

That’s by design: the cell will try to download whatever you write from the huggingface datasets library! You can search for datasets here: 

[Hugging Face – The AI community building the future.](https://huggingface.co/datasets)

Here’s me searching for a horoscopes dataset — there’s only one result to my surprise! I could use this in our notebook by writing `dkagramanyan/horoscopes_ru` in the cell above.

![Untitled](images/Untitled%2020.png)

**Scraping text from the internet**

There’s another way that I’ve tried to enable you to try out new data: uploading a text file to the Colab notebook. The kind of text you can use is honestly up to you here — if you can copy and paste it into a text document or just download one directly, then the model should be able to train on it!

As a note: this is a good task to think about doing if your model is training, or if you’re working in pairs and one person is focusing on the model!

Gathering lots of data like this without code can be a little difficult, so I’ve made one example for you: the entirety of the works of Shakespeare. You can access this text file from the GitHub page for our challenges below: 

[](https://github.com/alan-turing-institute/summer-experience-challenges/tree/main/language-modelling)

Clone the repository on your laptop so you have access to the file locally, then drag or upload the file to the Colab notebook to make it accessible! Make sure to use the correct filename (e.g. change `game-of-thrones.txt` to the name of the file you uploaded in this cell:

![Untitled](images/Untitled%2021.png)

### Step 6: Saving your model!

There’s one last cell at the bottom of the notebook. Running it will upload your model to HuggingFace so you can use it whenever you want — you’ll get output like this:

![Untitled](images/Untitled%2022.png)

If you look carefully, the first link that it gave us goes to the huggingface website — let’s see what the result looks like:

[turingsummerexperience/my-great-gpt2-recipe-model · Hugging Face](https://huggingface.co/turingsummerexperience/my-great-gpt2-recipe-model)

Hopefully on the right of the page, you should see something like this:

![Untitled](images/Untitled%2023.png)

This is a box that lets you keep playing with the output of your model! If you pressed “Compute” here, you’d get the model to complete the sentence “My name is Thomas and my main…”.

<aside>
💡 If you change the model name in the training settings, then you’ll be able to save a different model. Otherwise, you’ll overwrite the model that’s already there!

</aside>

---

## Reflection: Fine-tuning vs Prompt engineering — are they the same?

<aside>
❓ Have a think: what do you think are the main differences between prompt engineering and fine-tuning?

</aside>

Here are some thoughts from Andrej Karpathy, who works at OpenAI:

> *I roughly think of finetuning as analogous to expertise in people:*
> 
> - *Describe a task in words ~= zero-shot prompting*
> - *Give examples of solving task ~= few-shot prompting*
> - *Allow person to practice task ~= finetuning*
> 
> *With this analogy in mind, it's awesome that we have models that can reach high levels of accuracy across many tasks with prompting alone, but I also expect that reaching top tier performance will include finetuning, especially in applications with concrete well-defined tasks where it is possible to collect a lot of data and "practice" on it.*
> 
> *Rough picture to have in mind maybe. Small models are incapable of in-context learning and will benefit very little from prompt engineering, but depending on the difficulty of the task it may be possible to still finetune them into decent experts.
> Big caveat all of this is still very new.*
> 

Here’s the “rough picture” he mentions. Despite being a very quickly hand-drawn graph, we can see the general ideas he poses:

- Small models don’t respond well to prompt engineering, but *large models do*!
- Fine tuning is much more impactful for small models than large ones
- You can get really good results from a large model *without any extra training —* just write good prompts!

![Image source: Andrej Karpathy (who sketched this quickly in google slides…)](images/Untitled%2024.png)

Image source: Andrej Karpathy (who sketched this quickly in google slides…)

# I’ve done everything — how can I go further?

The first thing I would look at is the code underneath the notebook cells. Try and get the idea of what each cell is doing (probably with lots of google searches). Please ask for help, this can be hard for anyone!

You’ll need a sprinkle of python to get the gist, which you can learn a bit of via games like this:

[py.CheckiO - Python coding challenges and exercises with solutions for beginners and advanced](https://py.checkio.org/)

Lots of the code from the notebook we ran came from HuggingFace tutorials! You’ll be able to learn more about the world of HuggingFace here:

[🤗 Transformers Notebooks](https://huggingface.co/docs/transformers/notebooks)

I would particularly recommend looking at fine-tuning a model on a different task — it will really cement the idea of fine-tuning, and will give you the power to go beyond text generation (think of things like doing chatbots/question-answer workflows, classifying movie reviews, translation… there’s all sorts to explore here!!)

If you want to stay relatively up-to-date with the latest and greatest in language models, I highly recommend the ****************[Latent Space Podcast**************** by swyx](https://podcasts.apple.com/gb/podcast/latent-space-the-ai-engineer-podcast-codegen-agents/id1674008350) (the themes can get a little tech bro now and again, but most of the stuff on AI is really good, and they’ve been really fast to cover any big news items!)