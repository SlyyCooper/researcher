# 🔎 GPT Researcher

**GPT Researcher is an autonomous agent designed for comprehensive web and local research on any given task.** 

**Our mission is to empower individuals and organizations with accurate, unbiased, and factual information through AI.**

## Why GPT Researcher?

- Objective conclusions for manual research can take weeks, requiring vast resources and time.
- LLMs trained on outdated information can hallucinate, becoming irrelevant for current research tasks.
- Current LLMs have token limitations, insufficient for generating long research reports.
- Limited web sources in existing services lead to misinformation and shallow results.
- Selective web sources can introduce bias into research tasks.

## Architecture

The core idea is to utilize 'planner' and 'execution' agents. The planner generates research questions, while the execution agents gather relevant information. The publisher then aggregates all findings into a comprehensive report.

Steps:
* Create a task-specific agent based on a research query.
* Generate questions that collectively form an objective opinion on the task.
* Use a crawler agent for gathering information for each question.
* Summarize and source-track each resource.
* Filter and aggregate summaries into a final research report.

## Features

- 📝 Generate detailed research reports using web and local documents.
- 🖼️ Smart image scraping and filtering for reports.
- 📜 Generate detailed reports exceeding 2,000 words.
- 🌐 Aggregate over 20 sources for objective conclusions.
- 🖥️ Frontend available in lightweight (HTML/CSS/JS) and production-ready (NextJS + Tailwind) versions.
- 🔍 JavaScript-enabled web scraping.
- 📂 Maintains memory and context throughout research.
- 📄 Export reports to PDF, Word, and other formats.

## ⚙️ Getting Started

### Installation

1. Install Python 3.11 or later. [Guide](https://www.tutorialsteacher.com/python/install-python).
2. Install dependencies and start the server:

    ```bash
    pip install -r requirements.txt
    python -m uvicorn main:app --reload
    ```

Visit [http://localhost:8000](http://localhost:8000) to start.

## Run as PIP package
```bash
pip install gpt-researcher

```
### Example Usage:
```python
...
from gpt_researcher import GPTResearcher

query = "why is Nvidia stock going up?"
researcher = GPTResearcher(query=query, report_type="research_report")
# Conduct research on the given query
research_result = await researcher.conduct_research()
# Write the report
report = await researcher.write_report()
...
```

**For more examples and configurations, please refer to the [PIP documentation](https://docs.gptr.dev/docs/gpt-researcher/gptr/pip-package) page.**


## Run with Docker

> **Step 1** - [Install Docker](https://docs.gptr.dev/docs/gpt-researcher/getting-started/getting-started-with-docker)

> **Step 2** - Clone the '.env.example' file, add your API Keys to the cloned file and save the file as '.env'

> **Step 3** - Within the docker-compose file comment out services that you don't want to run with Docker.

```bash
docker-compose up --build
```

If that doesn't work, try running it without the dash:
```bash
docker compose up --build
```

> **Step 4** - The docker-compose file, this flow will start **2 processes**:
 - the Python server running on localhost:8000<br> (backend)
 - the React app running on localhost:3000<br> (frontend)

Visit localhost:3000 on any browser and enjoy researching!

## 📄 Research on Local Documents

You can instruct the GPT Researcher to run research tasks based on your local documents. Currently supported file formats are: PDF, plain text, CSV, Excel, Markdown, PowerPoint, and Word documents.

Step 1: Add the env variable `DOC_PATH` pointing to the folder where your documents are located.

```bash
export DOC_PATH="./my-docs"
```

Step 2: 
 - If you're running the frontend app on localhost:8000, simply select "My Documents" from the "Report Source" Dropdown Options.
 - If you're running GPT Researcher with the PIP package pass the `report_source` argument as "local" when you instantiate the `GPTResearcher` class.

## 👪 Multi-Agent Assistant
As AI evolves from prompt engineering and RAG to multi-agent systems, we're excited to introduce our new multi-agent assistant built with LangGraph.

By using LangGraph, the research process can be significantly improved in depth and quality by leveraging multiple agents with specialized skills. Inspired by the recent STORM paper, this project showcases how a team of AI agents can work together to conduct research on a given topic, from planning to publication.

An average run generates a 5-6 page research report in multiple formats such as PDF, Docx and Markdown. Cna go up to ~36 pages.

## 🖥️ Frontend Applications

GPT-Researcher now features an enhanced frontend to improve the user experience and streamline the research process. The frontend offers:

- An intuitive interface for inputting research queries
- Real-time progress tracking of research tasks
- Interactive display of research findings
- Customizable settings for tailored research experiences

Two deployment options are available:
1. A lightweight static frontend served by FastAPI
2. A feature-rich NextJS application for advanced functionality