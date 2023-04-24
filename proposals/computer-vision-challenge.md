##  The Vaccinating Drone

*Taking inspiration from the great MIT Media Lab [Ethics for AI course](https://docs.google.com/document/d/1e9wx9oBg7CR0s5O7YnYHVmX7H7pnITfoDxNdrSGkp60/view).*

**Summary:** The challenge requires the students to develop an AI system for a fictional vaccinating drone. We tell the students there's been a viral outbreak that's targeting dogs and cats, and the government wants to deploy drones that locate stray dogs and cats on the streets for vaccination.However, the vaccines for dogs and cats *are different*, and the system should be able to distinguish between them using its camera.

**Learning themes and outcomes:** 

- Understand how a classification model works, using *training data* within an 
*algorithm* to *predict* the label 
of instances not seen before.
- Understand the impact of biases in training data in prediction quality, and how it can impact our society.
- Describe what engineers can do to mitigate the effects of biased systems.


**Sessions:** 

***Challenge Pitch (5 min video pitch - Monday):***
An brief overview of the challenge, focussed on the vaccination scenario.

***Classification Models (0.5 hours - Thursday):***
We start by explaining the basics of supervised learning to the students, and show them how to build classification models using the [Teachable Machine Platform](https://teachablemachine.withgoogle.com/). In this introduction, we can group them in pairs to train a system that recognise each person in the group (as done in [this lesson by ReadyAI](https://edu.readyai.org/courses/teachable-machine/)).


***The Vaccinating Drone Warm-Up (1.5 hours - Thursday):***
To motivate the scenario: we provide the students with three small datasets: 1) training dataset (15 cats, 7 dogs), 2) testing dataset (5 cats, 5 dogs), and a 3) supplementary dataset (8 extra dogs). When training only using the training dataset, the students will see that the model performs very badly with dogs, which means that many dogs will receive the wrong vaccine. **We can use this outcome to present the notions of bias in machine learning**. We then  show that we can address bias by increasing the quality of our data: using the supplementary dataset, the model performs better (but still makes some mistakes).

![](https://i.imgur.com/6tv4PL1.png)


***The Vaccinating Drone Challenge (1.5 hours - Friday):***
Now it comes the competition: the students need to build a classifier, using the Teachable Machine Platform, that distinguishes between dogs and cats. Their models will be evaluated using a secret testing dataset, that will be way more challenging than the data we provided before (hairless cats and dogs, photos from weird angles and noisy backgrounds). 

![](https://i.imgur.com/ON8hucF.jpeg)

Also, each team will provide some images for evaluation, that ideally should be handled well by their models but can challenge the models from other teams. The task for the students is to gather a data from the internet that reflects the diversity of dogs and cats. The competition evaluation metric can be the number of vaccinated dogs and cats.

***Challenge Wrap-Up (1 hour - Friday):*** The students do a short 1-slide presentation of their rationale gathering data for their model, explaining how they are addressing data bias. After their presentation, their model is evaluated over the secret testing dataset.

**Opportunities for Collaboration:** _Summary of how teamwork and collaboration can feature in this challenge_

**Development plan:** 
 - Prepare the script, slides, and videos required per session.
 - Prepare the secret challenge dataset (hairless cats and dogs, dogs that look like cats, blurred pictures, cropped images, and weird angles like fisheye, disabled dogs and cats, cartoon style).
 - Extra challenge, in case students finish early.

**Development time:** _An estimate of how long it will take to prepare the challenge_

**Delivery plan:** 
 - 2+ Turing people to present and supervise, depending on the number of students.
 - Internet connection (with firewalls allowing the Teachable Machines website)
 - Laptops with decent webcams. One per team would be enough 
 
 *This challenge does not require any programming skills, if that's a factor going into group making.*

**Questions/risks:** 

- Where are they advertising the summer school programme? 
- What's the background of the students?
- How many students there will be, and what is the group size?