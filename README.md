<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/anhtien228/web-based-ai">
    <img src="images/logo.png" alt="Logo" width="100%" height="100%">
  </a>

  <h3 align="center">Text Summarizer using BART Model</h3>

  <p align="center">
    A repository of my self-research about NLP Transformer and BART model. The work involves fine-tuning a pretrain model, deployment on the Hugging Face - a community and data science platform, and a little bit of spicy web design/development (I love design).
    <br />
    <a href="https://github.com/anhtien228/web-based-ai"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/anhtien228/web-based-ai">View Demo</a>
    ·
    <a href="https://github.com/anhtien228/web-based-ai/issues">Report Bug</a>
    ·
    <a href="https://github.com/anhtien228/web-based-ai/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project

[![Summary Web Application][product-screenshot]](https://huggingface.co/spaces/datien228/text-summarizer)

The main scope of this project is to build a minimalist web application that summarize the documents input by user. The summarization can be extractive or abstractive, depending on the aim of the application. The development of the web application involve simple one-page design, elements and colors since I love minimalistic. For the Natural Language Processing (NLP) model, I choose to use the Sequence-2-Sequence model for summarization task. Among the models that I have investigated, BART (Bidirectional Auto-Regressive Transformers) from Facebook has a very good performance in providing abstractive summary (or extractive, if needed). Therefore, I decide to use it for my web application.

The model can be easily found from [Hungging Face Hub](https://huggingface.co/models). _Hugging Face is a community and data science platform that provides: Tools that enable users to build, train and deploy ML models based on open source (OS) code and technologies_. It has been risen in the recent years for providing such helpful environment where learners can tried out their models and make inferences. Hugging Face also provide Auto Train service, however, I choose to fine-tune a pre-trained model by myself to see how the model works, and to get familiar with the [Transformers](https://huggingface.co/docs/transformers/main/en/index) and the application deployment.


<p align="right">(<a href="#top">back to top</a>)</p>


### Built With

For the web developement, I use Flask since it is easy to use and compatible with Hugging Face deployment. For the training process, the notebooks run on both Google Colaboratory and Kaggle. I switched between these two platform when one of their exceeds the quota.

* [Google Colaboratory](https://colab.research.google.com)
* [Kaggle Notebook](https://www.kaggle.com)
* [Hugging Face Docs](https://huggingface.co/docs)

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

### How it works

#### 1. Model and Datasets

BART model was introduced at Facebook Research at ACL 2020. It has the ability to generate text based on the information from the encoder, i.e it specifically used for **sequence-to-sequence** problem compared to BERT (Bidirectional Encoder Representations from Transformers) which only pretrains on encoder, not decoder.

The most used BART model would be base-sized BART provided by Facebook. A distilled version of BART has been implemented by many researchers. One remarkable study was conducted by `Sam Shleifer and Alexander M. Rush`, where three distillation approaches direct knowledge distillation, pseudo-labeling, and shrink and fine-tune (SFT), were compared. In this project, I decided to used the distilled BART model by Sam Shleifer (`distilbart-12-6-cnn`) and fine-tuned it on the datasets `multi_news`. Using the pre-trained model only is actually good enough. But as I have mentioned, I'd like to fine-tune and implement it by myself so I could learn something new during the progress.

_For more information about BART model and the dataset, please refer to [BART: Denoising Sequence-to-Sequence Pre-training for Natural Language Generation, Translation, and Comprehension](https://scontent.fsgn13-2.fna.fbcdn.net/v/t39.8562-6/106373513_3414102562251474_8005430471454563564_n.pdf?_nc_cat=105&ccb=1-7&_nc_sid=ae5e01&_nc_ohc=7lT9fZ6UN2kAX8hIzMr&_nc_ht=scontent.fsgn13-2.fna&oh=00_AT-pEWAFUAr2sylDWGJwd_LnXEB3q9ajv3p3KmRY_EwA9g&oe=62CEF084), [Pre-trained Summarization Distillation](https://arxiv.org/abs/2010.13002) and [multi_news dataset](https://huggingface.co/datasets/multi_news)

#### 2. Web Application

The web application is quite simple. It was implemented by using basic HTML, CSS, JQuery and Bootstraps 5. Some of the components used in this website was borrowed by examples from the internet as well. The web application is called **Summary**.

References:
[CSS Button Hover Effects](https://tympanus.net/Development/LineHoverStyles/)
[One Page Website Design](https://www.sliderrevolution.com/design/one-page-website/)

#### 3. Deployment

The web application was implemented by Flask. The repository main branch consists the work used in the development stage. For the deployment code, please refer to `deployment` branch as it has some differences in the paths inside the HTML files compared to that of local deployment.

The online demo was deployed using Hugging Face Spaces - a platform offer simple way to host ML demo apps directly on our profile.

_For more information, please refer to the [Hugging Face Spaces Documentation](https://huggingface.co/docs/hub/spaces)_

### Prerequisites

There is no prerequisites for this projects.


<!-- USAGE EXAMPLES -->
## Usage

The application was deployed on [Text Summarizer](https://huggingface.co/spaces/datien228/text-summarizer).


<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [x] Add Changelog
- [ ] Create pages `creator`, `development` and `feedback`
- [ ] Fine-tune the model on Vietnamese language
- [ ] Optimize the website's code (optional)


See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Doan Anh Tien - Linkedin: [atien228](https://www.linkedin.com/in/atien228/) - d.atien228@gmail.com

Project Link: [web-based-ai](https://github.com/anhtien228/web-based-ai)

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Here is the list of resources that I have found during the research and I believe it would be useful for you too.

* [Attention Is All You Need](https://arxiv.org/pdf/1706.03762.pdf)
* [BART: Denoising Sequence-to-Sequence Pre-training for Natural Language Generation, Translation, and Comprehension](https://scontent.fsgn13-2.fna.fbcdn.net/v/t39.8562-6/106373513_3414102562251474_8005430471454563564_n.pdf?_nc_cat=105&ccb=1-7&_nc_sid=ae5e01&_nc_ohc=7lT9fZ6UN2kAX8hIzMr&_nc_ht=scontent.fsgn13-2.fna&oh=00_AT-pEWAFUAr2sylDWGJwd_LnXEB3q9ajv3p3KmRY_EwA9g&oe=62CEF084)
* [Transformers](https://towardsdatascience.com/transformers-89034557de14) 
* [Understanding Attention In Deep Learning](https://towardsdatascience.com/attaining-attention-in-deep-learning-a712f93bdb1e)

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/anhtien228/web-based-ai.svg?style=for-the-badge
[contributors-url]: https://https://github.com/anhtien228/web-based-ai/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/anhtien228/web-based-ai.svg?style=for-the-badge
[forks-url]: https://https://github.com/anhtien228/web-based-ai/network/members
[stars-shield]: https://img.shields.io/github/stars/anhtien228/web-based-ai.svg?style=for-the-badge
[stars-url]: https://https://github.com/anhtien228/web-based-ai/stargazers
[issues-shield]: https://img.shields.io/github/issues/anhtien228/web-based-ai.svg?style=for-the-badge
[issues-url]: https://https://github.com/anhtien228/web-based-ai/issues
[license-shield]: https://img.shields.io/github/license/anhtien228/web-based-ai.svg?style=for-the-badge
[license-url]: https://https://github.com/anhtien228/web-based-ai/main/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/atien228/
[product-screenshot]: images/project.png
