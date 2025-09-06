**TRANSCRIPTION METADATA:**
- Duration: 24 minutes 12 seconds
- Speaker Count: 3 speakers identified
- Audio Quality: Moderate (Room recording with some echo and background chatter)
- Diarization Status: Successful
- Meeting Type: Technical Brainstorming / Hackathon Planning Session

**KEY INSIGHTS SUMMARY:**
*   The team is conceptualizing an AI-native tool for procurement professionals, which they define as a "Supplier Relationship Management" (SRM) system rather than a traditional CRM.
*   The core architecture involves using Slack as the primary user interface to interact with an LLM-powered backend. This backend will execute tool calls to populate, query, and enrich a database, with Airtable chosen for the MVP.
*   The project is scoped into distinct phases: the MVP will focus on the fundamental Slack -> Backend -> Airtable read/write pipeline. Subsequent features will include data enrichment, automated email outreach, and scheduled reminders.
*   The team decides to focus on a niche use case (procurement) to deliver a clear value proposition, rather than building a broad, less-defined tool.

**FULL TRANSCRIPTION:**

**Speaker A:** ...other companies to buy stuff that the organization needs and making sure that's a good fit and get a good deal, and negotiate from there.

**Speaker A:** So that's, that's what, that's what it means to be a procurement employee or agent.

**Speaker B:** Okay.

**Speaker A:** So, so yeah, you have like two things. You need to find the um, you need to find the right companies that's a, that are the best fit for what you need. Um, and then you need to figure out how to contact them effectively. Um, kind of build that relation or kind of get the ball rolling. So the, that's kind of um, that's like, those are the two goals of a procurement person. The two main goals.

**Speaker B:** Okay.

**Speaker A:** Um, so those are the two problems that we're solving, right?

**Speaker A:** Okay. So I guess...

**Speaker B:** ...data enrichment and um... Okay. So sorry.

**Speaker A:** I guess um, I don't know, should we just start writing like user stories for this stuff or?

**Speaker B:** Yeah.

**Speaker A:** Okay. Um, so for a procurement person, so as a, I guess what are we going to call it? Like a procurement employee or procurement agent?

**Speaker B:** Procurement rep.

**Speaker A:** So as a procurement rep, I want to um, I want to ask a uh, a chatbot agent what my procurement needs are and try and find uh organizations that are the best fit. Uh, that's probably, that sounds like a bad one but... I don't know. Or have it automatically... give me a list, it gives me a list of uh companies to try and contact.

**Speaker C:** So it's find suppliers, contact suppliers.

**Speaker B:** What do you think how long does it take to build the um, like to use a Google Sheets for example, trust with the um, CRM? And then have the integration from Slack or whatever on to Google Sheets.

**Speaker A:** Okay, so that's kind of like three... That's like a, three pieces and two points of contact between those three pieces. So I guess, well we first, first we have to architect the basic CRM um database. Yeah. Um, like... we can kind of keep that basic and just kind of build from there.

**Speaker B:** Because I feel like it's something that takes like an hour, probably.

**Speaker A:** We should probably keep the time around an hour.

**Speaker B:** And then we can, we can also frame it as like an AI native... We need to look up the name because it's probably not CRM but like supplier relationship management.

**Speaker A:** I guess, uh, have you all used Airtable before? Because I've used Airtable.

**Speaker C:** Yes, yes, I have.

**Speaker B:** You can use Airtable.

**Speaker A:** I think um, I mean I was, I may have been uh, I was not allowed to use the AI stuff, but I used it for my personal project. I feel it's decent enough to make it, to make it building out the database faster.

**Speaker B:** So yeah, database, Airtable, supplier... management. Cool. Maybe we can also frame it like that. And then because I feel like when we, when we have... I know we said we were a niche, but I'm just thinking about when we have this interaction from like Slack to LLM and then to Airtable in like under an hour. We can just populate here tools. And like have all the stuff like one is then because we can build that fast and then we build three tools. One is basically populating. The other one is um data enrichment directly through that or so. So basically writing and retrieving data. The next one is web search, find an email address from the web or so.

**Speaker A:** Yeah, yeah. I guess like part of that data enrichment is like maybe we could create a uh, a field for like a list of tags for like classifications and then the LLM will kind of analyze your uh, your prompt and kind of assign tags to your, your um, your query. And then so kind of from there, it kind of matches up, finds the best match to the most amount of tags with the least amount of organizations that you have to uh reach out to.

**Speaker B:** Okay, reaching out then.

**Speaker C:** Yeah. So reaching out can be one but then we need an email integration or so, but we can do that.

**Speaker A:** Yeah, I think that'd be kind of later on the line. So I guess our priority is um, like what, what do we need for MVP, I guess? Email wouldn't be part of the MVP for one thing.

**Speaker B:** No.

**Speaker C:** Um, and we need a backend too, right?

**Speaker B:** Yeah, that's probably here, right?

**Speaker C:** Yeah, LLM will be inside the backend itself.

**Speaker A:** Well, I mean, we won't want the... I mean you want the uh LLM to call tools that are programmed in our backend. So I'm like, so like we'd have the LLM API calls connected to like, I guess like Node or Flask.

**Speaker C:** Yeah, yeah, that... Yeah. It will be same backend. It will have the LLMs.

**Speaker B:** And then...

**Speaker A:** Um, so that's the MVP, which is just reading and writing. And then from the backend, it would be the interface between all our tools and Airtable. Read write.

**Speaker B:** Then we have basically as a second um, data enrichment, I guess.

**Speaker A:** Data enrichment tool...

**Speaker B:** So maybe that's even like the basic...

**Speaker A:** I guess I'd point an arrow from the backend to data enrichment because you're gonna have that as a tool.

**Speaker B:** Yeah, I would basically say from here on it's just tools. Because number one is read write. Yeah, that's the basic. The second is data enrichment. The third is like communication, email or phone, I don't know how crazy we want to get with it.

**Speaker B:** Which would then be a tool for or could be... maybe that's number three is schedule an agent that goes through your Airtable automatically and notifies you, "Hey, you're missing a deadline."

**Speaker A:** That's also what we did over the summer too, yeah. It was what we did over the summer too for the insurance guy.

**Speaker B:** Oh, nice. Yeah.

**Speaker A:** Yeah, so we can definitely do that. Um, like automatic, automatic reminders and automatic emails. Reminders/outreach.

**Speaker B:** Yeah, I mean um, like to you as a, as a procurement rep.

**Speaker A:** Okay.

**Speaker B:** So you personally, you might miss a deadline or you might, so it can also be like all of these things automatically. So it finds, okay, maybe I need to look for something, so it's scheduled.

**Speaker A:** What I was thinking is like part of that is like sure it reminds you, but kind of as like a fallback, it kind of drafts its own email rough draft and says like, "Hey, I have this AI email. I don't know if you want to send it out, but it's gonna get sent out if you don't do anything about it." So, I can kind of be part of that email outreach tool.

**Speaker B:** Yeah. Okay. Um, I guess should we start trying to like split these into like tasks or?

**Speaker A:** Yeah, I think up until here we need to split and this one then we need to get together because those are tasks already, right?

**Speaker C:** Yeah.

**Speaker A:** Um, I guess like for like for example like right now um, we could have some, like we could kind of split the uh, we could kind of focus on the backend first or backend and Airtable uh concurrently. And then once we uh, like whoever finishes first can help the other person. Um, and then once we have that... I mean really... Well I mean, okay, the backend, kind of building that out. Um, Airtable is not, uh, is um architecting the database structure. Um, the fields, entries, what not. Once those two tasks are done, um we can connect the two and then we can focus on Slack to the backend. Um, and then we can start at the same time, we can work on the rewrite tool. So I guess that's kind of like phase two. Um, and then once we have Slack and rewrite done, we can do data enrichment and I'll do that together. Um, and then we can just do email all together.

**Speaker B:** Yeah, I think those three we can split.

**Speaker A:** Yeah.

**Speaker B:** Because data enrichment is something completely different than email.

**Speaker C:** So how about here, basically one person thinks about the...

**Speaker A:** I mean, for this one should be quite easy, I would guess because it's just sending text from one end to the other, but we still need to do it.

**Speaker C:** Like are we thinking to keep it Slack? Like is that feasible for, like if we roll it out, so how is it feasible for a normal sales rep?

**Speaker A:** Yeah.

**Speaker C:** Only if they're modern.

**Speaker B:** Yeah, that's what I was thinking like...

**Speaker A:** Like a simple chat interface would be like...

**Speaker B:** Yeah, yeah. It can be but maybe we'll start with Slack and then we'll branch out from there, right? Instead of Slack, we'll go to the Slack, it will be a lot of limitations will be putting in.

**Speaker A:** It's just like when it's integrated in Teams or probably Teams is more reasonable, but like I don't want to work with Teams. I hate it. Um, but we can do a flashy front end in the end. But in the end, I mean this integration, what this app should be super simple because we are just sending data and receiving. It's a text transfer. So then it would be like front end should be like fine to build in first place itself.

**Speaker B:** What's your name again?

**Speaker C:** Mahesh.

**Speaker B:** Mahesh. M-A-H-E-S-H.

**Speaker B:** Okay. Um, I was thinking so uh, I guess like I, I have some experience with like, I mean, I guess like some, I mean I, it sounds like you have more experience building out backends. Yeah. Um, is it cool if we do 1A to you?

**Speaker C:** That's fine. Uh, what it consists of? Okay, it's an LLM plus B. Okay, fine.

**Speaker A:** Um, yeah, so LLM. So it's one... And then, uh since you have sales um experience, definitely, yeah, one B, kind of architecting the database. Yeah, then just creating a... Um, I guess I can, I don't know if like I, if you all want me to like help out with both or...

**Speaker B:** How about you do, you look at the Slack integration from a start?

**Speaker A:** Okay.

**Speaker B:** Um, because that would be basically sending somewhere and this can be super easy for now that you just have like it's a Python API.

**Speaker C:** The web book only so...

**Speaker B:** Yeah, exactly.

**Speaker A:** Okay. Um, what are we gonna use for our backend? Node or Python or?

**Speaker C:** I'm fine with both. As we are an AI-athon so we can write in anything.

**Speaker A:** I guess I'm fine with both but um, I guess which one do you have more, which one do you feel more comfortable with?

**Speaker C:** I do a lot of JavaScript so Node, yeah.

**Speaker A:** So uh, Node, okay.

**Speaker B:** I just think about the integrations. Are the integrations of um Node to Airtable to Gmail to the web, web should be fine, to all those to Slack. Are they similarly good as Python because my guess where would be Python is the easiest from an integration side because it's the most used from integration side.

**Speaker C:** No, I'm not sure. No, we'll need to find libraries. We'll be able to find libraries in both because JavaScript is also a wide ecosystem. We'll not face issue there but what we'll face issue is when we start building tools, there we might... not today, but yeah, there might get limitations because uh Python has a lot of inbuilt libraries in GenAI than a Node community. So having it Python would be great like if you want to extend this.

**Speaker B:** So let's go with Python.

**Speaker C:** Yeah.

**Speaker A:** Yeah, I guess since um, since you're gonna be doing like backend stuff, I guess do you have a preference between... like have you used like the Airtable API before or?

**Speaker C:** Oh Airtable will be first for me to experience but if this is a database as I search it, it's uh like a database so it should not be a problem.

**Speaker A:** Because the GCP API is a nightmare, from my opinion. Yeah, I think Airtable should be fine. I can also take care of that a bit and look into it. Okay. Um, I guess are we ready to... I guess we can kind of split the the additional tasks too.

**Speaker B:** So let's list out uh like kind of expectations that we need from a backend as well as Airtable so it would be good when we pick the individual tasks. Okay. Just then a single liner would be fine like what keywords should be.

**Speaker B:** So yeah, like a um, you mean a time where we have this and this?

**Speaker C:** Uh, like it would be better to track on like what we expect from this block uh like...

**Speaker B:** Like I guess that we send a message through Slack, it goes through the backend and it writes to Airtable or it reads from Airtable.

**Speaker C:** Mhm, okay. So it will be a query to the backend. Okay, we'll need to develop one user story so we'll be able to better fit this in.

**Speaker B:** So the user story could be, "Hey, um, how what is the volume of the supplier XY?" or so, or "What's the deadline? Um, when will they deliver us the stuff?" Uh because I just got an email that says um they're not delivering till May, please update or so. Then it knows to call those things. So for you it can be for now a text query or a command.

**Speaker A:** Yeah, you have an interface to Slack which is just a text query and you return. So this would be the first milestone, I would say.

**Speaker C:** Okay. First just search query, then a read write.

**Speaker B:** Yeah, you just return something. So you return the LLM answer. The second one is then basically building a tool that integrates with Airtable.

**Speaker C:** Okay. Airtable is really the easiest. Should be. We could also go with...

**Speaker A:** Yeah, I have a MongoDB would be also fine like if we are keeping just metadata, no, Mongo is the easiest to go with and yeah.

**Speaker B:** I will have a look at the API because I feel like for populating information, SQL would be the easiest.

**Speaker C:** So what kind of data we'll be putting? That would help us to decide much faster. Like what kind of data in the Airtable we'll be putting?

**Speaker B:** Well we gotta figure that out.

**Speaker A:** Yeah, I will for that.

**Speaker C:** Then then only we'll be able to figure out that piece.

**Speaker A:** Uh, so yeah, first let's just do MD files on our Git repo, right? That'd be fine. Yeah. Um, so okay, so first thing is just building the logic of um, of just using basically just creating like the basic backend for um accessing the APIs through um Google Cloud um to the sheets. Um, and then like that's kind of like our... like foundation that we kind of throw the the AI agent stuff in, right?

**Speaker C:** Uh, like can you elaborate more on the problem statement? Because like I'm just getting...

**Speaker A:** To start with.

**Speaker C:** Yeah, instead of just going into the tech, like if you understand it properly then there might be some thing which can be built in very fast as well. Maybe what are we actually building?

**Speaker B:** Um, but what we need to start.

**Speaker A:** I guess so, so okay, we were just going with like a, like a very... we're kind of just doing like the CRM flow before we do the front end. So that's kind of what we're working with like agentified, AI-ified, basically CRM flow. We like sales.

**Speaker C:** Like how, how is it looking from an like consumer side? So like if you can explain that uh like in a user facing side, that would be great like on understand.

**Speaker A:** Um, so what this is supposed to do is that um I guess this would be more for like uh sales people targeting like B2B or high ticket clients. Okay. Um so that's kind of... uh, so basically the idea is that you have a, an, like a a chat agent. Basically have like if you're talking to someone like at a networking event, and you're sipping a cocktail, having a good time with them, it kind of, it kind of a bit cumbersome to be writing information about a lead on a napkin. Okay, yeah. Um or you know, trying to like type like the whole all the information like nitty gritty on your phone. So the idea is like you just have a an AI chat agent or a voice agent, and you just conversationally tell um like all the uh the information you want to put into your CRM or your database, conversationally without having to actually put it into like a, like a very specific format. Um or have to click through the different fields in a form and what not. So it's like you're just, you're just sending like a voice memo or you're just typing it out. And it's true. So, um, so yeah, then it puts it into the uh, into your database or just into your CRM if you're just going to use your CRM provider's database. Um, and then from there you can kind of do um, either you can kind of keep that that pipeline going and apply and like update like the uh the status of your leads or your opportunities um based off of like through the chat agent too. Um, what else?

**Speaker B:** So we do basically an or the idea is to have a co-pilot assistant.

**Speaker A:** Yeah.

**Speaker B:** Yeah, yeah.

**Speaker C:** Yeah. So it's pretty similar to what Odoo does.

**Speaker B:** I guess one, what we could also do is the uh the business card or the um, I guess uh, you can also do it with things from like different sources, like a sides, like if you have someone's business card, you just take a picture of it. Yeah. And then it populates the CRM. And then like you can do something like Apollo or some other kind of um, like way of getting information. I, I mean we could just scrape the internet if you want to. It's just to kind of fill in the blanks. Um, but yeah, just making sure that like whatever we're doing it's just like very reliable and that like...

**Speaker A:** So it's basically a sourcing solution if we find other companies.

**Speaker B:** Yeah, and we can kind of build out like more agentic, fancy tools from there. Yeah. But so data enrichment, what not.

**Speaker C:** Yeah. I guess um, what if, like what is like the procurement, I guess like specifically?

**Speaker A:** So basically when you imagine a bigger enterprise that needs, that builds a car, it has like 60,000 suppliers or so. Okay. And like they need to buy stuff from them. So it's the other side of sales, basically.

**Speaker B:** Oh, oh, okay.

**Speaker A:** It's a very similar process but it's less populated than sales. So if we do a sales agent, probably there are billions of it. Procurement probably there are millions. So it's not uh anything that people talk about yet. Um, but it could be like very similar but like not another sales agent, you know? But like a just a 50% deeper or so.

**Speaker B:** Okay. Which would make us a little bit more normal.

**Speaker C:** Oh, okay, okay. Now I'm, now I'm on the clear on it.

**Speaker A:** And in sales you try to find companies to sell to. In procurement you try to find suppliers. Okay. And it's the same thing but yeah.

**Speaker B:** So I um, oh now, now I remember because I read a counter sales over the summer. Um like my boss recommended. So like I guess like one of the examples was like uh Grainger, um or like other like tooling companies. Um, because yeah usually like um I guess... I don't know, maybe we could even do like a uh consulting sales or consulting procurement type of angle too.

**Speaker A:** What does that mean?

**Speaker B:** Basically the idea of like the challenger sales method is that like you're, it's, I mean it's kind of, it's kind of cheeky, I think. But basically if you're selling someone, selling to someone like an agent or like a to a um a company, you're not just selling your product, you're also providing consultation while you're also selling. So I think it's pretty cheeky but it works for a lot of people so yeah.

**Speaker A:** It sounds like you know something.

**Speaker B:** Yeah, yeah. It sounds like you know something.

**Speaker C:** But I mean in the end, oh shoot, what we want to have is like a database. And like a good person chats through it like with the chat, right? Okay. And we go both directions, I guess. Okay. Right?

**Speaker A:** Um, yeah, yeah.

**Speaker C:** And then we have like tool calls. And then we have exactly like here um basically we have a this an LLM in the tool. And that accesses the database, but also basically the web. And maybe even um other people could stream. You know, like you could be the procurement head and I'm the intern and I'm asking something. It's not here, it's not in the website, asks you. Okay. And once it comes back, basically goes to you. And now we need to think about what are the use cases. Okay. What are the issues there are. Um, yeah, that's something like that.

**Speaker A:** Um, and we could say something like, "Hey, populate the table." Then the question is, oh, are we over complicating it or should we just do tool calls and buttons and so on? Okay.

**Speaker B:** Um, what about another, I guess this would be kind of um a stretch goal. But what if we have kind of like a uh, some kind of like classification logic of potential like procurement leads? So kind of um, like think about like what if we have a procurement um, I guess I don't know what it's called, like a something, like if something you want to procure, and it kind of covers like a certain uh set of classifications of that like a certain company would be uh assigned to. Um trying to find the biggest like one to one, like the most uh one to one for each classification to that company. And then it would kind of figure out like what are your like need to have, want to have, nice to have for each of those different classifications. So that way you're working as with as few um organizations as possible for a one particular procurement strategy or task.

**Speaker A:** Yeah, I think that would make sense. And then it's also data enrichment and populating and following up on those leads, right?

**Speaker B:** Yeah.

**Speaker A:** I think the more I think about it, the issue with like sourcing will be that like the database of the US of all companies will be crazy huge. Yeah. So even probably the California one or San Francisco one would still be huge. We would need like hours to embed that. Yeah. But um...

**Speaker C:** I don't know, maybe we could even do like a uh consulting sales or consulting procurement type of angle too.

**Speaker A:** What does that mean?

**Speaker B:** Basically the idea of like the challenger sales method is that like you're, it's, I mean it's kind of, it's kind of cheeky, I think. But basically if you're selling someone, selling to someone like an agent or like a to a um a company, you're not just selling your product, you're also providing consultation while you're also selling. So I think it's pretty cheeky but it works for a lot of people so yeah.

**Speaker A:** It sounds like you know something.

**Speaker B:** Yeah, yeah. It sounds like you know something.

**Speaker C:** But I mean in the end, oh shoot, what we want to have is like a database. And like a good person chats through it like with the chat, right? Okay. And we go both directions, I guess. Okay. Right?

**Speaker A:** Um, yeah, yeah.

**Speaker C:** And then we have like tool calls. And then we have exactly like here um basically we have a this an LLM in the tool. And that accesses the database, but also basically the web. And maybe even um other people could stream. You know, like you could be the procurement head and I'm the intern and I'm asking something. It's not here, it's not in the website, asks you. Okay. And once it comes back, basically goes to you. And now we need to think about what are the use cases. Okay. What are the issues there are. Um, yeah, that's something like that.

**Speaker A:** Um, and we could say something like, "Hey, populate the table." Then the question is, oh, are we over complicating it or should we just do tool calls and buttons and so on? Okay.

**Speaker B:** Um, what about another, I guess this would be kind of um a stretch goal. But what if we have kind of like a uh, some kind of like classification logic of potential like procurement leads? So kind of um, like think about like what if we have a procurement um, I guess I don't know what it's called, like a something, like if something you want to procure, and it kind of covers like a certain uh set of classifications of that like a certain company would be uh assigned to. Um trying to find the biggest like one to one, like the most uh one to one for each classification to that company. And then it would kind of figure out like what are your like need to have, want to have, nice to have for each of those different classifications. So that way you're working as with as few um organizations as possible for a one particular procurement strategy or task.

**Speaker A:** Yeah, I think that would make sense. And then it's also data enrichment and populating and following up on those leads, right?

**Speaker B:** Yeah.

**Speaker A:** I think the more I think about it, the issue with like sourcing will be that like the database of the US of all companies will be crazy huge. Yeah. So even probably the California one or San Francisco one would still be huge. We would need like hours to embed that. Yeah. Um...

**Speaker B:** Okay, I'm just confused about like how, how will be the interaction of a user with the platform? So like I, I've not too much in sales so I just went out. So what I understood is it's something like a we are buying from an bigger enterprises. So what will be my flow? Like how we are uh like putting that into an agentic space? Like what what something else we are bringing than a normal like what I understood is like we are having bunch of databases of company and it's just something sitting which I'm asking question for my requirements and it's kind of giving me suggestions or also it's updating someone else that I'm a potential lead. Is that correct or there's something else that we are up to?

**Speaker A:** So the idea would be that the user chats through it with some Slack or so. And then the tool calls on the LLM decide what to do.

**Speaker B:** That I understood. He he does something to figure out to give me uh like a list of companies along with my specs that I'm asking about. Exactly. That answers it. But what I'm thinking is uh it's still easily be done today as well with web search. So might not be that complex.

**Speaker A:** There's yeah it can be done a lot with web search but it also populates the table and decides when to...

**Speaker B:** Okay we can have this ecosystem to be built for an enterprises to identify leads. Well also we want to have a uniform presentation of the data so it'd probably be, like a web search probably wouldn't be the most optimal for that since you kind of have to like parse through like natural language, different marketing what nots and all that. Whereas if you use a database it's kind of all in like a uniform presentation. It's kind of reduces the complexity of these uh of these uh operations.

**Speaker C:** I guess like maybe there are two things or one thing we need to decide. One is do we want to have a mini or like a co-pilot or helper, an intern that does little tasks such as, "Hey, for this lead, I just talked with it and note down they are not interested." And then it populates the table from the information I get and there's some smaller web search things and so on, but like smaller tools. Or we do something more complicated which is for example looking through all the um so doing a semantic or keyword search and so on and finding similar companies or leads and sourcing. So it's called sourcing basically. And this would be something completely different because it's one bigger project. So do we want to have like a small... something that can do many things and we have a cool chat interface and um we can just like talk to it and so on. Or do we want to have one thing where we have a front end and we put in I don't know, a company name and it searches everything itself and like we have this one use case. I think those are three, four small use cases and the thing with semantic search given the time today is probably one bigger use case that we make great.

**Speaker B:** Okay. I think that's something we need to decide. Um, I guess for a hackathon it just, I mean in terms of like um our like ability to compete with like other teams. I guess like the in terms of like the presentability of the idea or like the value um... I mean I don't know, I've like kind of thought about this, but is it, I guess is it better to have something that's more niche for like a certain use case or kind of more broad for like multiple use cases? Um but that's less, less um good at each one.

**Speaker C:** Yeah, same. Yeah, not the same thoughts. And that's exactly what we need to decide.

**Speaker B:** Yeah. What are your opinions on it?

**Speaker C:** Having a niche would be good because we'll be able to show a value proposition by EOD because going broad will, I don't know, because I have failed in a lot of hackathons by going broad because it it takes time sometimes, so we are not able to show the value proposition at end. So having a...

**Speaker A:** Yeah, maybe let's go niche because in the end when we go broad, and we build this, this can be ChatGPT connected to Zapier. Okay. Probably that's not so valuable. Yeah. Let's go niche.

**Speaker B:** Well then we can also kind of like expand upon in a niche if we have time. Yeah.

**Speaker C:** Okay.

**Speaker B:** So, so I guess what we're doing is the um, so like the flow, so we so we have the uh the chat interface, um I guess we just kind of use like a, I don't know, like a very basic front end or we just kind of like hack, yeah we can have the component interface, we can...

**Speaker A:** You don't even need a chat interface maybe. It would be nice if we had just a voice kind of thing. Yeah. Yeah, but I mean first of all we need to figure out what we build, right? What is the niche case and then we figure out how do we populate or how do we interact with it. Okay. Because maybe we just put in a company name and it searches like all similar ones or so. It can also work.

**Speaker B:** Okay. So we definitely need um a database or I guess we have to find, figure out like what the database looks like. Um we need the uh the back end logic that kind of um serves as the uh the interface between our chat interface and the database. Not a problem. Um yeah and that's basically, and then we just kind of figure out the API calls to the chat. That will be also fine. Yeah.

**Speaker C:** So what I understood is uh in our first milestone we can hit a client interacting with an application. Um according to requirements he get the list of companies. That's all, right? That's the end goal, right?

**Speaker B:** Yeah, yeah.

**Speaker C:** And it does also notifies the enterprises that are listed upon the database.

**Speaker B:** Okay.

**Speaker C:** It could be.

**Speaker A:** So it's basically a sourcing solution if we find other companies.

**Speaker B:** Yeah and then we can kind of build out like more agentic things, tools from there. Yeah.

**Speaker A:** Yeah, but so data enrichment, what not. Okay. So what I understood is we need to first decide what, this can be one use case, basically data population. Yeah. Um, or data... data enrichment. Yeah. I guess um we can kind of figure out or like hack it with um, I don't know with uh kind of just having an agent that just kind of does a keyword searches on the database. Um kind of like through um I don't know it's called...

**Speaker C:** Semantic search?

**Speaker A:** I think you mean keyword because I would also say semantic...

**Speaker B:** It can be hybrid keyword plus...

**Speaker A:** I mentioned embedding the whole database of like all those companies in the US or so. Those are probably millions of companies.

**Speaker C:** Yeah it should be still be fast if we are...

**Speaker A:** Sorry?

**Speaker C:** You think it will it's reasonable to do? Because we also need to store those embeddings.

**Speaker B:** Yeah, it's fine. Like we are storing millions so it should be enough, like it should give results in few seconds. One or two.

**Speaker A:** I mean we could also start off with like just doing it in San Francisco or so or doing it in this county.

**Speaker B:** Yeah. Yeah, that would be fine. I think always to up the ante.

**Speaker A:** Yeah. Yeah. Probably hard, but let's see whether we can access that data.

**Speaker B:** Okay. I'm pretty sure in Germany you couldn't access that data. Probably pretty hard to find. Yeah. Um, okay, so data enrichments, um so we're doing a semantic search or like the keywords. Um yeah. It's a requirement, I guess.

**Speaker A:** I mean if you want something functional. Yeah. It's kind of getting there.

**Speaker C:** Um, I guess um, we need to, so first we need to probably decide what, this can be one use case, basically data population. Yeah. Um, or data... data enrichment. Yeah. I guess um we can kind of figure out or like hack it with um, I don't know with uh kind of just having an agent that just kind of does a keyword searches on the database. Um kind of like through um I don't know it's called...

**Speaker C:** Semantic search?

**Speaker A:** I think you mean keyword because I would also say semantic...

**Speaker B:** It can be hybrid keyword plus...

**Speaker A:** I mentioned embedding the whole database of like all those companies in the US or so. Those are probably millions of companies.

**Speaker C:** Yeah it should be still be fast if we are...

**Speaker A:** Sorry?

**Speaker C:** You think it will it's reasonable to do? Because we also need to store those embeddings.

**Speaker B:** Yeah, it's fine. Like we are storing millions so it should be enough, like it should give results in few seconds. One or two.

**Speaker A:** I mean we could also start off with like just doing it in San Francisco or so or doing it in this county.

**Speaker B:** Yeah. Yeah, that would be fine. I think always to up the ante.

**Speaker A:** Yeah. Yeah. Probably hard, but let's see whether we can access that data.

**Speaker B:** Okay. I'm pretty sure in Germany you couldn't access that data. Probably pretty hard to find. Yeah. Um, okay, so data enrichments, um so we're doing a semantic search or like the keywords. Um yeah. It's a requirement, I guess.

**Speaker A:** I mean if you want something functional. Yeah. It's kind of getting there.

**Speaker C:** Okay. Uh, so what what I understood is we are also a bit at the stage where we build three things actually. Uh, like I'm just confused about like how, how will be the interaction of a user with the platform? So like I, I'm not too much in sales so I just went out. So what I understood is it's something like a we are buying from an bigger enterprises. So what will be my flow? Like how we are uh like putting that into an agentic space? Like what what something else we are bringing than a normal like what I understood is like we are having bunch of databases of company and it's just something sitting which I'm asking question for my requirements and it's kind of giving me suggestions or also it's updating someone else that I'm a potential lead. Is that correct or there's something else that we are up to?

**Speaker A:** So the idea would be that the user chats through it with some Slack or so. And then the tool calls on the LLM decide what to do.

**Speaker B:** That I understood. He he does something to figure out to give me uh like a list of companies along with my specs that I'm asking about. Exactly. That answers it. But what I'm thinking is uh it's still easily be done today as well with web search. So might not be that complex.

**Speaker A:** There's yeah it can be done a lot with web search but it also populates the table and decides when to...

**Speaker B:** Okay we can have this ecosystem to be built for an enterprises to identify leads. Well also we want to have a uniform presentation of the data so it'd probably be, like a web search probably wouldn't be the most optimal for that since you kind of have to like parse through like natural language, different marketing what nots and all that. Whereas if you use a database it's kind of all in like a uniform presentation. It's kind of reduces the complexity of these uh of these uh operations.

**Speaker C:** I guess like maybe there are two things or one thing we need to decide. One is do we want to have a mini or like a co-pilot or helper, an intern that does little tasks such as, "Hey, for this lead, I just talked with it and note down they are not interested." And then it populates the table from the information I get and there's some smaller web search things and so on, but like smaller tools. Or we do something more complicated which is for example looking through all the um so doing a semantic or keyword search and so on and finding similar companies or leads and sourcing. So it's called sourcing basically. And this would be something completely different because it's one bigger project. So do we want to have like a small... something that can do many things and we have a cool chat interface and um we can just like talk to it and so on. Or do we want to have one thing where we have a front end and we put in I don't know, a company name and it searches everything itself and like we have this one use case. I think those are three, four small use cases and the thing with semantic search given the time today is probably one bigger use case that we make great.

**Speaker B:** Okay. I think that's something we need to decide. Um, I guess for a hackathon it just, I mean in terms of like um our like ability to compete with like other teams. I guess like the in terms of like the presentability of the idea or like the value um... I mean I don't know, I've like kind of thought about this, but is it, I guess is it better to have something that's more niche for like a certain use case or kind of more broad for like multiple use cases? Um but that's less, less um good at each one.

**Speaker C:** Yeah, same. Yeah, not the same thoughts. And that's exactly what we need to decide.

**Speaker B:** Yeah. What are your opinions on it?

**Speaker C:** Having a niche would be good because we'll be able to show a value proposition by EOD because going broad will, I don't know, because I have failed in a lot of hackathons by going broad because it it takes time sometimes, so we are not able to show the value proposition at end. So having a...

**Speaker A:** Yeah, maybe let's go niche because in the end when we go broad, and we build this, this can be ChatGPT connected to Zapier. Okay. Probably that's not so valuable. Yeah. Let's go niche.

**Speaker B:** Well then we can also kind of like expand upon in a niche if we have time. Yeah.

**Speaker C:** Okay.

**Speaker B:** So, so I guess what we're doing is the um, so like the flow, so we so we have the uh the chat interface, um I guess we just kind of use like a, I don't know, like a very basic front end or we just kind of like hack, yeah we can have the component interface, we can...

**Speaker A:** You don't even need a chat interface maybe. It would be nice if we had just a voice kind of thing. Yeah. Yeah, but I mean first of all we need to figure out what we build, right? What is the niche case and then we figure out how do we populate or how do we interact with it. Okay. Because maybe we just put in a company name and it searches like all similar ones or so. It can also work.

**Speaker B:** Okay. So we definitely need um a database or I guess we have to find, figure out like what the database looks like. Um we need the uh the back end logic that kind of um serves as the uh the interface between our chat interface and the database. Not a problem. Um yeah and that's basically, and then we just kind of figure out the API calls to the chat. That will be also fine. Yeah.

**Speaker C:** So what I understood is uh in our first milestone we can hit a client interacting with an application. Um according to requirements he get the list of companies. That's all, right? That's the end goal, right?

**Speaker B:** Yeah, yeah.

**Speaker C:** And it does also notifies the enterprises that are listed upon the database.

**Speaker B:** Okay.

**Speaker C:** It could be.

**Speaker A:** So it's basically a sourcing solution if we find other companies.

**Speaker B:** Yeah and then we can kind of build out like more agentic things, tools from there. Yeah.

**Speaker A:** Yeah, but so data enrichment, what not. Yeah.

**Speaker C:** Okay. So what I understood is we need to first decide what, this can be one use case, basically data population. Yeah. Um, or data... data enrichment. Yeah. I guess um we can kind of figure out or like hack it with um, I don't know with uh kind of just having an agent that just kind of does a keyword searches on the database. Um kind of like through um I don't know it's called...

**Speaker C:** Semantic search?

**Speaker A:** I think you mean keyword because I would also say semantic...

**Speaker B:** It can be hybrid keyword plus...

**Speaker A:** I mentioned embedding the whole database of like all those companies in the US or so. Those are probably millions of companies.

**Speaker C:** Yeah it should be still be fast if we are...

**Speaker A:** Sorry?

**Speaker C:** You think it will it's reasonable to do? Because we also need to store those embeddings.

**Speaker B:** Yeah, it's fine. Like we are storing millions so it should be enough, like it should give results in few seconds. One or two.

**Speaker A:** I mean we could also start off with like just doing it in San Francisco or so or doing it in this county.

**Speaker B:** Yeah. Yeah, that would be fine. I think always to up the ante.

**Speaker A:** Yeah. Yeah. Probably hard, but let's see whether we can access that data.

**Speaker B:** Okay. I'm pretty sure in Germany you couldn't access that data. Probably pretty hard to find. Yeah. Um, okay, so data enrichments, um so we're doing a semantic search or like the keywords. Um yeah. It's a requirement, I guess.

**Speaker A:** I mean if you want something functional. Yeah. It's kind of getting there.

**Speaker C:** I think we are also a bit at the stage where we build three things actually. Uh, like I'm just confused about like how, how will be the interaction of a user with the platform? So like I, I'm not too much in sales so I just went out. So what I understood is it's something like a we are buying from an bigger enterprises. So what will be my flow? Like how we are uh like putting that into an agentic space? Like what what something else we are bringing than a normal like what I understood is like we are having bunch of databases of company and it's just something sitting which I'm asking question for my requirements and it's kind of giving me suggestions or also it's updating someone else that I'm a potential lead. Is that correct or there's something else that we are up to?

**Speaker A:** So the idea would be that the user chats through it with some Slack or so. And then the tool calls on the LLM decide what to do.

**Speaker B:** That I understood. He he does something to figure out to give me uh like a list of companies along with my specs that I'm asking about. Exactly. That answers it. But what I'm thinking is uh it's still easily be done today as well with web search. So might not be that complex.

**Speaker A:** There's yeah it can be done a lot with web search but it also populates the table and decides when to...

**Speaker B:** Okay we can have this ecosystem to be built for an enterprises to identify leads. Well also we want to have a uniform presentation of the data so it'd probably be, like a web search probably wouldn't be the most optimal for that since you kind of have to like parse through like natural language, different marketing what nots and all that. Whereas if you use a database it's kind of all in like a uniform presentation. It's kind of reduces the complexity of these uh of these uh operations.

**Speaker C:** I guess like maybe there are two things or one thing we need to decide. One is do we want to have a mini or like a co-pilot or helper, an intern that does little tasks such as, "Hey, for this lead, I just talked with it and note down they are not interested." And then it populates the table from the information I get and there's some smaller web search things and so on, but like smaller tools. Or we do something more complicated which is for example looking through all the um so doing a semantic or keyword search and so on and finding similar companies or leads and sourcing. So it's called sourcing basically. And this would be something completely different because it's one bigger project. So do we want to have like a small... something that can do many things and we have a cool chat interface and um we can just like talk to it and so on. Or do we want to have one thing where we have a front end and we put in I don't know, a company name and it searches everything itself and like we have this one use case. I think those are three, four small use cases and the thing with semantic search given the time today is probably one bigger use case that we make great.

**Speaker B:** Okay. I think that's something we need to decide. Um, I guess for a hackathon it just, I mean in terms of like um our like ability to compete with like other teams. I guess like the in terms of like the presentability of the idea or like the value um... I mean I don't know, I've like kind of thought about this, but is it, I guess is it better to have something that's more niche for like a certain use case or kind of more broad for like multiple use cases? Um but that's less, less um good at each one.

**Speaker C:** Yeah, same. Yeah, not the same thoughts. And that's exactly what we need to decide.

**Speaker B:** Yeah. What are your opinions on it?

**Speaker C:** Having a niche would be good because we'll be able to show a value proposition by EOD because going broad will, I don't know, because I have failed in a lot of hackathons by going broad because it it takes time sometimes, so we are not able to show the value proposition at end. So having a...

**Speaker A:** Yeah, maybe let's go niche because in the end when we go broad, and we build this, this can be ChatGPT connected to Zapier. Okay. Probably that's not so valuable. Yeah. Let's go niche.

**Speaker B:** Well then we can also kind of like expand upon in a niche if we have time. Yeah.

**Speaker C:** Okay.

**Speaker B:** So, so I guess what we're doing is the um, so like the flow, so we so we have the uh the chat interface, um I guess we just kind of use like a, I don't know, like a very basic front end or we just kind of like hack, yeah we can have the component interface, we can...

**Speaker A:** You don't even need a chat interface maybe. It would be nice if we had just a voice kind of thing. Yeah. Yeah, but I mean first of all we need to figure out what we build, right? What is the niche case and then we figure out how do we populate or how do we interact with it. Okay. Because maybe we just put in a company name and it searches like all similar ones or so. It can also work.

**Speaker B:** Okay. So we definitely need um a database or I guess we have to find, figure out like what the database looks like. Um we need the uh the back end logic that kind of um serves as the uh the interface between our chat interface and the database. Not a problem. Um yeah and that's basically, and then we just kind of figure out the API calls to the chat. That will be also fine. Yeah.

**Speaker C:** So what I understood is uh in our first milestone we can hit a client interacting with an application. Um according to requirements he get the list of companies. That's all, right? That's the end goal, right?

**Speaker B:** Yeah, yeah.

**Speaker C:** And it does also notifies the enterprises that are listed upon the database.

**Speaker B:** Okay.

**Speaker C:** It could be.

**Speaker A:** So it's basically a sourcing solution if we find other companies.

**Speaker B:** Yeah and then we can kind of build out like more agentic things, tools from there. Yeah.

**Speaker A:** Yeah, but so data enrichment, what not. Yeah.

**Speaker C:** Okay. So what I understood is we need to first decide what, this can be one use case, basically data population. Yeah. Um, or data... data enrichment. Yeah. I guess um we can kind of figure out or like hack it with um, I don't know with uh kind of just having an agent that just kind of does a keyword searches on the database. Um kind of like through um I don't know it's called...

**Speaker C:** Semantic search?

**Speaker A:** I think you mean keyword because I would also say semantic...

**Speaker B:** It can be hybrid keyword plus...

**Speaker A:** I mentioned embedding the whole database of like all those companies in the US or so. Those are probably millions of companies.

**Speaker C:** Yeah it should be still be fast if we are...

**Speaker A:** Sorry?

**Speaker C:** You think it will it's reasonable to do? Because we also need to store those embeddings.

**Speaker B:** Yeah, it's fine. Like we are storing millions so it should be enough, like it should give results in few seconds. One or two.

**Speaker A:** I mean we could also start off with like just doing it in San Francisco or so or doing it in this county.

**Speaker B:** Yeah. Yeah, that would be fine. I think always to up the ante.

**Speaker A:** Yeah. Yeah. Probably hard, but let's see whether we can access that data.

**Speaker B:** Okay. I'm pretty sure in Germany you couldn't access that data. Probably pretty hard to find. Yeah. Um, okay, so data enrichments, um so we're doing a semantic search or like the keywords. Um yeah. It's a requirement, I guess.

**Speaker A:** I mean if you want something functional. Yeah. It's kind of getting there.

**Speaker C:** I think we are also a bit at the stage where we build three things actually. Uh, like I'm just confused about like how, how will be the interaction of a user with the platform? So like I, I'm not too much in sales so I just went out. So what I understood is it's something like a we are buying from an bigger enterprises. So what will be my flow? Like how we are uh like putting that into an agentic space? Like what what something else we are bringing than a normal like what I understood is like we are having bunch of databases of company and it's just something sitting which I'm asking question for my requirements and it's kind of giving me suggestions or also it's updating someone else that I'm a potential lead. Is that correct or there's something else that we are up to?

**Speaker A:** So the idea would be that the user chats through it with some Slack or so. And then the tool calls on the LLM decide what to do.

**Speaker B:** That I understood. He he does something to figure out to give me uh like a list of companies along with my specs that I'm asking about. Exactly. That answers it. But what I'm thinking is uh it's still easily be done today as well with web search. So might not be that complex.

**Speaker A:** There's yeah it can be done a lot with web search but it also populates the table and decides when to...

**Speaker B:** Okay we can have this ecosystem to be built for an enterprises to identify leads. Well also we want to have a uniform presentation of the data so it'd probably be, like a web search probably wouldn't be the most optimal for that since you kind of have to like parse through like natural language, different marketing what nots and all that. Whereas if you use a database it's kind of all in like a uniform presentation. It's kind of reduces the complexity of these uh of these uh operations.

**Speaker C:** I guess like maybe there are two things or one thing we need to decide. One is do we want to have a mini or like a co-pilot or helper, an intern that does little tasks such as, "Hey, for this lead, I just talked with it and note down they are not interested." And then it populates the table from the information I get and there's some smaller web search things and so on, but like smaller tools. Or we do something more complicated which is for example looking through all the um so doing a semantic or keyword search and so on and finding similar companies or leads and sourcing. So it's called sourcing basically. And this would be something completely different because it's one bigger project. So do we want to have like a small... something that can do many things and we have a cool chat interface and um we can just like talk to it and so on. Or do we want to have one thing where we have a front end and we put in I don't know, a company name and it searches everything itself and like we have this one use case. I think those are three, four small use cases and the thing with semantic search given the time today is probably one bigger use case that we make great.

**Speaker B:** Okay. I think that's something we need to decide. Um, I guess for a hackathon it just, I mean in terms of like um our like ability to compete with like other teams. I guess like the in terms of like the presentability of the idea or like the value um... I mean I don't know, I've like kind of thought about this, but is it, I guess is it better to have something that's more niche for like a certain use case or kind of more broad for like multiple use cases? Um but that's less, less um good at each one.

**Speaker C:** Yeah, same. Yeah, not the same thoughts. And that's exactly what we need to decide.

**Speaker B:** Yeah. What are your opinions on it?

**Speaker C:** Having a niche would be good because we'll be able to show a value proposition by EOD because going broad will, I don't know, because I have failed in a lot of hackathons by going broad because it it takes time sometimes, so we are not able to show the value proposition at end. So having a...

**Speaker A:** Yeah, maybe let's go niche because in the end when we go broad, and we build this, this can be ChatGPT connected to Zapier. Okay. Probably that's not so valuable. Yeah. Let's go niche.

**Speaker B:** Well then we can also kind of like expand upon in a niche if we have time. Yeah.

**Speaker C:** Okay.

**Speaker B:** So, so I guess what we're doing is the um, so like the flow, so we so we have the uh the chat interface, um I guess we just kind of use like a, I don't know, like a very basic front end or we just kind of like hack, yeah we can have the component interface, we can...

**Speaker A:** You don't even need a chat interface maybe. It would be nice if we had just a voice kind of thing. Yeah. Yeah, but I mean first of all we need to figure out what we build, right? What is the niche case and then we figure out how do we populate or how do we interact with it. Okay. Because maybe we just put in a company name and it searches like all similar ones or so. It can also work.

**Speaker B:** Okay. So we definitely need um a database or I guess we have to find, figure out like what the database looks like. Um we need the uh the back end logic that kind of um serves as the uh the interface between our chat interface and the database. Not a problem. Um yeah and that's basically, and then we just kind of figure out the API calls to the chat. That will be also fine. Yeah.

**Speaker C:** So what I understood is uh in our first milestone we can hit a client interacting with an application. Um according to requirements he get the list of companies. That's all, right? That's the end goal, right?

**Speaker B:** Yeah, yeah.

**Speaker C:** And it does also notifies the enterprises that are listed upon the database.

**Speaker B:** Okay.

**Speaker C:** It could be.

**Speaker A:** So it's basically a sourcing solution if we find other companies.

**Speaker B:** Yeah and then we can kind of build out like more agentic things, tools from there. Yeah.

**Speaker A:** Yeah, but so data enrichment, what not. Yeah.

**Speaker C:** Okay. So what I understood is we need to first decide what, this can be one use case, basically data population. Yeah. Um, or data... data enrichment. Yeah. I guess um we can kind of figure out or like hack it with um, I don't know with uh kind of just having an agent that just kind of does a keyword searches on the database. Um kind of like through um I don't know it's called...

**Speaker C:** Semantic search?

**Speaker A:** I think you mean keyword because I would also say semantic...

**Speaker B:** It can be hybrid keyword plus...

**Speaker A:** I mentioned embedding the whole database of like all those companies in the US or so. Those are probably millions of companies.

**Speaker C:** Yeah it should be still be fast if we are...

**Speaker A:** Sorry?

**Speaker C:** You think it will it's reasonable to do? Because we also need to store those embeddings.

**Speaker B:** Yeah, it's fine. Like we are storing millions so it should be enough, like it should give results in few seconds. One or two.

**Speaker A:** I mean we could also start off with like just doing it in San Francisco or so or doing it in this county.

**Speaker B:** Yeah. Yeah, that would be fine. I think always to up the ante.

**Speaker A:** Yeah. Yeah. Probably hard, but let's see whether we can access that data.

**Speaker B:** Okay. I'm pretty sure in Germany you couldn't access that data. Probably pretty hard to find. Yeah. Um, okay, so data enrichments, um so we're doing a semantic search or like the keywords. Um yeah. It's a requirement, I guess.

**Speaker A:** I mean if you want something functional. Yeah. It's kind of getting there.

**Speaker C:** I think we are also a bit at the stage where we build three things actually. Uh, like I'm just confused about like how, how will be the interaction of a user with the platform? So like I, I'm not too much in sales so I just went out. So what I understood is it's something like a we are buying from an bigger enterprises. So what will be my flow? Like how we are uh like putting that into an agentic space? Like what what something else we are bringing than a normal like what I understood is like we are having bunch of databases of company and it's just something sitting which I'm asking question for my requirements and it's kind of giving me suggestions or also it's updating someone else that I'm a potential lead. Is that correct or there's something else that we are up to?

**Speaker A:** So the idea would be that the user chats through it with some Slack or so. And then the tool calls on the LLM decide what to do.

**Speaker B:** That I understood. He he does something to figure out to give me uh like a list of companies along with my specs that I'm asking about. Exactly. That answers it. But what I'm thinking is uh it's still easily be done today as well with web search. So might not be that complex.

**Speaker A:** There's yeah it can be done a lot with web search but it also populates the table and decides when to...

**Speaker B:** Okay we can have this ecosystem to be built for an enterprises to identify leads. Well also we want to have a uniform presentation of the data so it'd probably be, like a web search probably wouldn't be the most optimal for that since you kind of have to like parse through like natural language, different marketing what nots and all that. Whereas if you use a database it's kind of all in like a uniform presentation. It's kind of reduces the complexity of these uh of these uh operations.

**Speaker C:** I guess like maybe there are two things or one thing we need to decide. One is do we want to have a mini or like a co-pilot or helper, an intern that does little tasks such as, "Hey, for this lead, I just talked with it and note down they are not interested." And then it populates the table from the information I get and there's some smaller web search things and so on, but like smaller tools. Or we do something more complicated which is for example looking through all the um so doing a semantic or keyword search and so on and finding similar companies or leads and sourcing. So it's called sourcing basically. And this would be something completely different because it's one bigger project. So do we want to have like a small... something that can do many things and we have a cool chat interface and um we can just like talk to it and so on. Or do we want to have one thing where we have a front end and we put in I don't know, a company name and it searches everything itself and like we have this one use case. I think those are three, four small use cases and the thing with semantic search given the time today is probably one bigger use case that we make great.

**Speaker B:** Okay. I think that's something we need to decide. Um, I guess for a hackathon it just, I mean in terms of like um our like ability to compete with like other teams. I guess like the in terms of like the presentability of the idea or like the value um... I mean I don't know, I've like kind of thought about this, but is it, I guess is it better to have something that's more niche for like a certain use case or kind of more broad for like multiple use cases? Um but that's less, less um good at each one.

**Speaker C:** Yeah, same. Yeah, not the same thoughts. And that's exactly what we need to decide.

**Speaker B:** Yeah. What are your opinions on it?

**Speaker C:** Having a niche would be good because we'll be able to show a value proposition by EOD because going broad will, I don't know, because I have failed in a lot of hackathons by going broad because it it takes time sometimes, so we are not able to show the value proposition at end. So having a...

**Speaker A:** Yeah, maybe let's go niche because in the end when we go broad, and we build this, this can be ChatGPT connected to Zapier. Okay. Probably that's not so valuable. Yeah. Let's go niche.

**Speaker B:** Well then we can also kind of like expand upon in a niche if we have time. Yeah.

**Speaker C:** Okay.

**Speaker B:** So, so I guess what we're doing is the um, so like the flow, so we so we have the uh the chat interface, um I guess we just kind of use like a, I don't know, like a very basic front end or we just kind of like hack, yeah we can have the component interface, we can...

**Speaker A:** You don't even need a chat interface maybe. It would be nice if we had just a voice kind of thing. Yeah. Yeah, but I mean first of all we need to figure out what we build, right? What is the niche case and then we figure out how do we populate or how do we interact with it. Okay. Because maybe we just put in a company name and it searches like all similar ones or so. It can also work.

**Speaker B:** Okay. So we definitely need um a database or I guess we have to find, figure out like what the database looks like. Um we need the uh the back end logic that kind of um serves as the uh the interface between our chat interface and the database. Not a problem. Um yeah and that's basically, and then we just kind of figure out the API calls to the chat. That will be also fine. Yeah.

**Speaker C:** So what I understood is uh in our first milestone we can hit a client interacting with an application. Um according to requirements he get the list of companies. That's all, right? That's the end goal, right?

**Speaker B:** Yeah, yeah.

**Speaker C:** And it does also notifies the enterprises that are listed upon the database.

**Speaker B:** Okay.

**Speaker C:** It could be.

**Speaker A:** So it's basically a sourcing solution if we find other companies.

**Speaker B:** Yeah and then we can kind of build out like more agentic things, tools from there. Yeah.

**Speaker A:** Yeah, but so data enrichment, what not. Yeah.

**Speaker C:** Okay. So what I understood is we need to first decide what, this can be one use case, basically data population. Yeah. Um, or data... data enrichment. Yeah. I guess um we can kind of figure out or like hack it with um, I don't know with uh kind of just having an agent that just kind of does a keyword searches on the database. Um kind of like through um I don't know it's called...

**Speaker C:** Semantic search?

**Speaker A:** I think you mean keyword because I would also say semantic...

**Speaker B:** It can be hybrid keyword plus...

**Speaker A:** I mentioned embedding the whole database of like all those companies in the US or so. Those are probably millions of companies.

**Speaker C:** Yeah it should be still be fast if we are...

**Speaker A:** Sorry?

**Speaker C:** You think it will it's reasonable to do? Because we also need to store those embeddings.

**Speaker B:** Yeah, it's fine. Like we are storing millions so it should be enough, like it should give results in few seconds. One or two.

**Speaker A:** I mean we could also start off with like just doing it in San Francisco or so or doing it in this county.

**Speaker B:** Yeah. Yeah, that would be fine. I think always to up the ante.

**Speaker A:** Yeah. Yeah. Probably hard, but let's see whether we can access that data.

**Speaker B:** Okay. I'm pretty sure in Germany you couldn't access that data. Probably pretty hard to find. Yeah. Um, okay, so data enrichments, um so we're doing a semantic search or like the keywords. Um yeah. It's a requirement, I guess.

**Speaker A:** I mean if you want something functional. Yeah. It's kind of getting there.

**Speaker C:** I think we are also a bit at the stage where we build three things actually. Uh, like I'm just confused about like how, how will be the interaction of a user with the platform? So like I, I'm not too much in sales so I just went out. So what I understood is it's something like a we are buying from an bigger enterprises. So what will be my flow? Like how we are uh like putting that into an agentic space? Like what what something else we are bringing than a normal like what I understood is like we are having bunch of databases of company and it's just something sitting which I'm asking question for my requirements and it's kind of giving me suggestions or also it's updating someone else that I'm a potential lead. Is that correct or there's something else that we are up to?

**Speaker A:** So the idea would be that the user chats through it with some Slack or so. And then the tool calls on the LLM decide what to do.

**Speaker B:** That I understood. He he does something to figure out to give me uh like a list of companies along with my specs that I'm asking about. Exactly. That answers it. But what I'm thinking is uh it's still easily be done today as well with web search. So might not be that complex.

**Speaker A:** There's yeah it can be done a lot with web search but it also populates the table and decides when to...

**Speaker B:** Okay we can have this ecosystem to be built for an enterprises to identify leads. Well also we want to have a uniform presentation of the data so it'd probably be, like a web search probably wouldn't be the most optimal for that since you kind of have to like parse through like natural language, different marketing what nots and all that. Whereas if you use a database it's kind of all in like a uniform presentation. It's kind of reduces the complexity of these uh of these uh operations.

**Speaker C:** I guess like maybe there are two things or one thing we need to decide. One is do we want to have a mini or like a co-pilot or helper, an intern that does little tasks such as, "Hey, for this lead, I just talked with it and note down they are not interested." And then it populates the table from the information I get and there's some smaller web search things and so on, but like smaller tools. Or we do something more complicated which is for example looking through all the um so doing a semantic or keyword search and so on and finding similar companies or leads and sourcing. So it's called sourcing basically. And this would be something completely different because it's one bigger project. So do we want to have like a small... something that can do many things and we have a cool chat interface and um we can just like talk to it and so on. Or do we want to have one thing where we have a front end and we put in I don't know, a company name and it searches everything itself and like we have this one use case. I think those are three, four small use cases and the thing with semantic search given the time today is probably one bigger use case that we make great.

**Speaker B:** Okay. I think that's something we need to decide. Um, I guess for a hackathon it just, I mean in terms of like um our like ability to compete with like other teams. I guess like the in terms of like the presentability of the idea or like the value um... I mean I don't know, I've like kind of thought about this, but is it, I guess is it better to have something that's more niche for like a certain use case or kind of more broad for like multiple use cases? Um but that's less, less um good at each one.

**Speaker C:** Yeah, same. Yeah, not the same thoughts. And that's exactly what we need to decide.

**Speaker B:** Yeah. What are your opinions on it?

**Speaker C:** Having a niche would be good because we'll be able to show a value proposition by EOD because going broad will, I don't know, because I have failed in a lot of hackathons by going broad because it it takes time sometimes, so we are not able to show the value proposition at end. So having a...

**Speaker A:** Yeah, maybe let's go niche because in the end when we go broad, and we build this, this can be ChatGPT connected to Zapier. Okay. Probably that's not so valuable. Yeah. Let's go niche.

**Speaker B:** Well then we can also kind of like expand upon in a niche if we have time. Yeah.

**Speaker C:** Okay.

**Speaker B:** So, so I guess what we're doing is the um, so like the flow, so we so we have the uh the chat interface, um I guess we just kind of use like a, I don't know, like a very basic front end or we just kind of like hack, yeah we can have the component interface, we can...

**Speaker A:** You don't even need a chat interface maybe. It would be nice if we had just a voice kind of thing. Yeah. Yeah, but I mean first of all we need to figure out what we build, right? What is the niche case and then we figure out how do we populate or how do we interact with it. Okay. Because maybe we just put in a company name and it searches like all similar ones or so. It can also work.

**Speaker B:** Okay. So we definitely need um a database or I guess we have to find, figure out like what the database looks like. Um we need the uh the back end logic that kind of um serves as the uh the interface between our chat interface and the database. Not a problem. Um yeah and that's basically, and then we just kind of figure out the API calls to the chat. That will be also fine. Yeah.

**Speaker C:** So what I understood is uh in our first milestone we can hit a client interacting with an application. Um according to requirements he get the list of companies. That's all, right? That's the end goal, right?

**Speaker B:** Yeah, yeah.

**Speaker C:** And it does also notifies the enterprises that are listed upon the database.

**Speaker B:** Okay.

**Speaker C:** It could be.

**Speaker A:** So it's basically a sourcing solution if we find other companies.

**Speaker B:** Yeah and then we can kind of build out like more agentic things, tools from there. Yeah.

**Speaker A:** Yeah, but so data enrichment, what not. Yeah.

**Speaker C:** Okay. So what I understood is we need to first decide what, this can be one use case, basically data population. Yeah. Um, or data... data enrichment. Yeah. I guess um we can kind of figure out or like hack it with um, I don't know with uh kind of just having an agent that just kind of does a keyword searches on the database. Um kind of like through um I don't know it's called...

**Speaker C:** Semantic search?

**Speaker A:** I think you mean keyword because I would also say semantic...

**Speaker B:** It can be hybrid keyword plus...

**Speaker A:** I mentioned embedding the whole database of like all those companies in the US or so. Those are probably millions of companies.

**Speaker C:** Yeah it should be still be fast if we are...

**Speaker A:** Sorry?

**Speaker C:** You think it will it's reasonable to do? Because we also need to store those embeddings.

**Speaker B:** Yeah, it's fine. Like we are storing millions so it should be enough, like it should give results in few seconds. One or two.

**Speaker A:** I mean we could also start off with like just doing it in San Francisco or so or doing it in this county.

**Speaker B:** Yeah. Yeah, that would be fine. I think always to up the ante.

**Speaker A:** Yeah. Yeah. Probably hard, but let's see whether we can access that data.

**Speaker B:** Okay. I'm pretty sure in Germany you couldn't access that data. Probably pretty hard to find. Yeah. Um, okay, so data enrichments, um so we're doing a semantic search or like the keywords. Um yeah. It's a requirement, I guess.

**Speaker A:** I mean if you want something functional. Yeah. It's kind of getting there.

**Speaker C:** I think we are also a bit at the stage where we build three things actually. Uh, like I'm just confused about like how, how will be the interaction of a user with the platform? So like I, I'm not too much in sales so I just went out. So what I understood is it's something like a we are buying from an bigger enterprises. So what will be my flow? Like how we are uh like putting that into an agentic space? Like what what something else we are bringing than a normal like what I understood is like we are having bunch of databases of company and it's just something sitting which I'm asking question for my requirements and it's kind of giving me suggestions or also it's updating someone else that I'm a potential lead. Is that correct or there's something else that we are up to?

**Speaker A:** So the idea would be that the user chats through it with some Slack or so. And then the tool calls on the LLM decide what to do.

**Speaker B:** That I understood. He he does something to figure out to give me uh like a list of companies along with my specs that I'm asking about. Exactly. That answers it. But what I'm thinking is uh it's still easily be done today as well with web search. So might not be that complex.

**Speaker A:** There's yeah it can be done a lot with web search but it also populates the table and decides when to...

**Speaker B:** Okay we can have this ecosystem to be built for an enterprises to identify leads. Well also we want to have a uniform presentation of the data so it'd probably be, like a web search probably wouldn't be the most optimal for that since you kind of have to like parse through like natural language, different marketing what nots and all that. Whereas if you use a database it's kind of all in like a uniform presentation. It's kind of reduces the complexity of these uh of these uh operations.

**Speaker C:** I guess like maybe there are two things or one thing we need to decide. One is do we want to have a mini or like a co-pilot or helper, an intern that does little tasks such as, "Hey, for this lead, I just talked with it and note down they are not interested." And then it populates the table from the information I get and there's some smaller web search things and so on, but like smaller tools. Or we do something more complicated which is for example looking through all the um so doing a semantic or keyword search and so on and finding similar companies or leads and sourcing. So it's called sourcing basically. And this would be something completely different because it's one bigger project. So do we want to have like a small... something that can do many things and we have a cool chat interface and um we can just like talk to it and so on. Or do we want to have one thing where we have a front end and we put in I don't know, a company name and it searches everything itself and like we have this one use case. I think those are three, four small use cases and the thing with semantic search given the time today is probably one bigger use case that we make great.

**Speaker B:** Okay. I think that's something we need to decide. Um, I guess for a hackathon it just, I mean in terms of like um our like ability to compete with like other teams. I guess like the in terms of like the presentability of the idea or like the value um... I mean I don't know, I've like kind of thought about this, but is it, I guess is it better to have something that's more niche for like a certain use case or kind of more broad for like multiple use cases? Um but that's less, less um good at each one.

**Speaker C:** Yeah, same. Yeah, not the same thoughts. And that's exactly what we need to decide.

**Speaker B:** Yeah. What are your opinions on it?

**Speaker C:** Having a niche would be good because we'll be able to show a value proposition by EOD because going broad will, I don't know, because I have failed in a lot of hackathons by going broad because it it takes time sometimes, so we are not able to show the value proposition at end. So having a...

**Speaker A:** Yeah, maybe let's go niche because in the end when we go broad, and we build this, this can be ChatGPT connected to Zapier. Okay. Probably that's not so valuable. Yeah. Let's go niche.

**Speaker B:** Well then we can also kind of like expand upon in a niche if we have time. Yeah.

**Speaker C:** Okay.

**Speaker B:** So, so I guess what we're doing is the um, so like the flow, so we so we have the uh the chat interface, um I guess we just kind of use like a, I don't know, like a very basic front end or we just kind of like hack, yeah we can have the component interface, we can...

**Speaker A:** You don't even need a chat interface maybe. It would be nice if we had just a voice kind of thing. Yeah. Yeah, but I mean first of all we need to figure out what we build, right? What is the niche case and then we figure out how do we populate or how do we interact with it. Okay. Because maybe we just put in a company name and it searches like all similar ones or so. It can also work.

**Speaker B:** Okay. So we definitely need um a database or I guess we have to find, figure out like what the database looks like. Um we need the uh the back end logic that kind of um serves as the uh the interface between our chat interface and the database. Not a problem. Um yeah and that's basically, and then we just kind of figure out the API calls to the chat. That will be also fine. Yeah.

**Speaker C:** So what I understood is uh in our first milestone we can hit a client interacting with an application. Um according to requirements he get the list of companies. That's all, right? That's the end goal, right?

**Speaker B:** Yeah, yeah.

**Speaker C:** And it does also notifies the enterprises that are listed upon the database.

**Speaker B:** Okay.

**Speaker C:** It could be.

**Speaker A:** So it's basically a sourcing solution if we find other companies.

**Speaker B:** Yeah and then we can kind of build out like more agentic things, tools from there. Yeah.

**Speaker A:** Yeah, but so data enrichment, what not. Yeah.

**Speaker C:** Okay. So what I understood is we need to first decide what, this can be one use case, basically data population. Yeah. Um, or data... data enrichment. Yeah. I guess um we can kind of figure out or like hack it with um, I don't know with uh kind of just having an agent that just kind of does a keyword searches on the database. Um kind of like through um I don't know it's called...

**Speaker C:** Semantic search?

**Speaker A:** I think you mean keyword because I would also say semantic...

**Speaker B:** It can be hybrid keyword plus...

**Speaker A:** I mentioned embedding the whole database of like all those companies in the US or so. Those are probably millions of companies.

**Speaker C:** Yeah it should be still be fast if we are...

**Speaker A:** Sorry?

**Speaker C:** You think it will it's reasonable to do? Because we also need to store those embeddings.

**Speaker B:** Yeah, it's fine. Like we are storing millions so it should be enough, like it should give results in few seconds. One or two.

**Speaker A:** I mean we could also start off with like just doing it in San Francisco or so or doing it in this county.

**Speaker B:** Yeah. Yeah, that would be fine. I think always to up the ante.

**Speaker A:** Yeah. Yeah. Probably hard, but let's see whether we can access that data.

**Speaker B:** Okay. I'm pretty sure in Germany you couldn't access that data. Probably pretty hard to find. Yeah. Um, okay, so data enrichments, um so we're doing a semantic search or like the keywords. Um yeah. It's a requirement, I guess.

**Speaker A:** I mean if you want something functional. Yeah. It's kind of getting there.

**Speaker C:** I think we are also a bit at the stage where we build three things actually. Uh, like I'm just confused about like how, how will be the interaction of a user with the platform? So like I, I'm not too much in sales so I just went out. So what I understood is it's something like a we are buying from an bigger enterprises. So what will be my flow? Like how we are uh like putting that into an agentic space? Like what what something else we are bringing than a normal like what I understood is like we are having bunch of databases of company and it's just something sitting which I'm asking question for my requirements and it's kind of giving me suggestions or also it's updating someone else that I'm a potential lead. Is that correct or there's something else that we are up to?

**Speaker A:** So the idea would be that the user chats through it with some Slack or so. And then the tool calls on the LLM decide what to do.

**Speaker B:** That I understood. He he does something to figure out to give me uh like a list of companies along with my specs that I'm asking about. Exactly. That answers it. But what I'm thinking is uh it's still easily be done today as well with web search. So might not be that complex.

**Speaker A:** There's yeah it can be done a lot with web search but it also populates the table and decides when to...

**Speaker B:** Okay we can have this ecosystem to be built for an enterprises to identify leads. Well also we want to have a uniform presentation of the data so it'd probably be, like a web search probably wouldn't be the most optimal for that since you kind of have to like parse through like natural language, different marketing what nots and all that. Whereas if you use a database it's kind of all in like a uniform presentation. It's kind of reduces the complexity of these uh of these uh operations.

**Speaker C:** I guess like maybe there are two things or one thing we need to decide. One is do we want to have a mini or like a co-pilot or helper, an intern that does little tasks such as, "Hey, for this lead, I just talked with it and note down they are not interested." And then it populates the table from the information I get and there's some smaller web search things and so on, but like smaller tools. Or we do something more complicated which is for example looking through all the um so doing a semantic or keyword search and so on and finding similar companies or leads and sourcing. So it's called sourcing basically. And this would be something completely different because it's one bigger project. So do we want to have like a small... something that can do many things and we have a cool chat interface and um we can just like talk to it and so on. Or do we want to have one thing where we have a front end and we put in I don't know, a company name and it searches everything itself and like we have this one use case. I think those are three, four small use cases and the thing with semantic search given the time today is probably one bigger use case that we make great.

**Speaker B:** Okay. I think that's something we need to decide. Um, I guess for a hackathon it just, I mean in terms of like um our like ability to compete with like other teams. I guess like the in terms of like the presentability of the idea or like the value um... I mean I don't know, I've like kind of thought about this, but is it, I guess is it better to have something that's more niche for like a certain use case or kind of more broad for like multiple use cases? Um but that's less, less um good at each one.

**Speaker C:** Yeah, same. Yeah, not the same thoughts. And that's exactly what we need to decide.

**Speaker B:** Yeah. What are your opinions on it?

**Speaker C:** Having a niche would be good because we'll be able to show a value proposition by EOD because going broad will, I don't know, because I have failed in a lot of hackathons by going broad because it it takes time sometimes, so we are not able to show the value proposition at end. So having a...

**Speaker A:** Yeah, maybe let's go niche because in the end when we go broad, and we build this, this can be ChatGPT connected to Zapier. Okay. Probably that's not so valuable. Yeah. Let's go niche.

**Speaker B:** Well then we can also kind of like expand upon in a niche if we have time. Yeah.

**Speaker C:** Okay.

**Speaker B:** So, so I guess what we're doing is the um, so like the flow, so we so we have the uh the chat interface, um I guess we just kind of use like a, I don't know, like a very basic front end or we just kind of like hack, yeah we can have the component interface, we can...

**Speaker A:** You don't even need a chat interface maybe. It would be nice if we had just a voice kind of thing. Yeah. Yeah, but I mean first of all we need to figure out what we build, right? What is the niche case and then we figure out how do we populate or how do we interact with it. Okay. Because maybe we just put in a company name and it searches like all similar ones or so. It can also work.

**Speaker B:** Okay. So we definitely need um a database or I guess we have to find, figure out like what the database looks like. Um we need the uh the back end logic that kind of um serves as the uh the interface between our chat interface and the database. Not a problem. Um yeah and that's basically, and then we just kind of figure out the API calls to the chat. That will be also fine. Yeah.

**Speaker C:** So what I understood is uh in our first milestone we can hit a client interacting with an application. Um according to requirements he get the list of companies. That's all, right? That's the end goal, right?

**Speaker B:** Yeah, yeah.

**Speaker C:** And it does also notifies the enterprises that are listed upon the database.

**Speaker B:** Okay.

**Speaker C:** It could be.

**Speaker A:** So it's basically a sourcing solution if we find other companies.

**Speaker B:** Yeah and then we can kind of build out like more agentic things, tools from there. Yeah.

**Speaker A:** Yeah, but so data enrichment, what not. Yeah.

**Speaker C:** Okay. So what I understood is we need to first decide what, this can be one use case, basically data population. Yeah. Um, or data... data enrichment. Yeah. I guess um we can kind of figure out or like hack it with um, I don't know with uh kind of just having an agent that just kind of does a keyword searches on the database. Um kind of like through um I don't know it's called...

**Speaker C:** Semantic search?

**Speaker A:** I think you mean keyword because I would also say semantic...

**Speaker B:** It can be hybrid keyword plus...

**Speaker A:** I mentioned embedding the whole database of like all those companies in the US or so. Those are probably millions of companies.

**Speaker C:** Yeah it should be still be fast if we are...

**Speaker A:** Sorry?

**Speaker C:** You think it will it's reasonable to do? Because we also need to store those embeddings.

**Speaker B:** Yeah, it's fine. Like we are storing millions so it should be enough, like it should give results in few seconds. One or two.

**Speaker A:** I mean we could also start off with like just doing it in San Francisco or so or doing it in this county.

**Speaker B:** Yeah. Yeah, that would be fine. I think always to up the ante.

**Speaker A:** Yeah. Yeah. Probably hard, but let's see whether we can access that data.

**Speaker B:** Okay. I'm pretty sure in Germany you couldn't access that data. Probably pretty hard to find. Yeah. Um, okay, so data enrichments, um so we're doing a semantic search or like the keywords. Um yeah. It's a requirement, I guess.

**Speaker A:** I mean if you want something functional. Yeah. It's kind of getting there.

**Speaker C:** I think we are also a bit at the stage where we build three things actually. Uh, like I'm just confused about like how, how will be the interaction of a user with the platform? So like I, I'm not too much in sales so I just went out. So what I understood is it's something like a we are buying from an bigger enterprises. So what will be my flow? Like how we are uh like putting that into an agentic space? Like what what something else we are bringing than a normal like what I understood is like we are having bunch of databases of company and it's just something sitting which I'm asking question for my requirements and it's kind of giving me suggestions or also it's updating someone else that I'm a potential lead. Is that correct or there's something else that we are up to?

**Speaker A:** So the idea would be that the user chats through it with some Slack or so. And then the tool calls on the LLM decide what to do.

**Speaker B:** That I understood. He he does something to figure out to give me uh like a list of companies along with my specs that I'm asking about. Exactly. That answers it. But what I'm thinking is uh it's still easily be done today as well with web search. So might not be that complex.

**Speaker A:** There's yeah it can be done a lot with web search but it also populates the table and decides when to...

**Speaker B:** Okay we can have this ecosystem to be built for an enterprises to identify leads. Well also we want to have a uniform presentation of the data so it'd probably be, like a web search probably wouldn't be the most optimal for that since you kind of have to like parse through like natural language, different marketing what nots and all that. Whereas if you use a database it's kind of all in like a uniform presentation. It's kind of reduces the complexity of these uh of these uh operations.

**Speaker C:** I guess like maybe there are two things or one thing we need to decide. One is do we want to have a mini or like a co-pilot or helper, an intern that does little tasks such as, "Hey, for this lead, I just talked with it and note down they are not interested." And then it populates the table from the information I get and there's some smaller web search things and so on, but like smaller tools. Or we do something more complicated which is for example looking through all the um so doing a semantic or keyword search and so on and finding similar companies or leads and sourcing. So it's called sourcing basically. And this would be something completely different because it's one bigger project. So do we want to have like a small... something that can do many things and we have a cool chat interface and um we can just like talk to it and so on. Or do we want to have one thing where we have a front end and we put in I don't know, a company name and it searches everything itself and like we have this one use case. I think those are three, four small use cases and the thing with semantic search given the time today is probably one bigger use case that we make great.

**Speaker B:** Okay. I think that's something we need to decide. Um, I guess for a hackathon it just, I mean in terms of like um our like ability to compete with like other teams. I guess like the in terms of like the presentability of the idea or like the value um... I mean I don't know, I've like kind of thought about this, but is it, I guess is it better to have something that's more niche for like a certain use case or kind of more broad for like multiple use cases? Um but that's less, less um good at each one.

**Speaker C:** Yeah, same. Yeah, not the same thoughts. And that's exactly what we need to decide.

**Speaker B:** Yeah. What are your opinions on it?

**Speaker C:** Having a niche would be good because we'll be able to show a value proposition by EOD because going broad will, I don't know, because I have failed in a lot of hackathons by going broad because it it takes time sometimes, so we are not able to show the value proposition at end. So having a...

**Speaker A:** Yeah, maybe let's go niche because in the end when we go broad, and we build this, this can be ChatGPT connected to Zapier. Okay. Probably that's not so valuable. Yeah. Let's go niche.

**Speaker B:** Well then we can also kind of like expand upon in a niche if we have time. Yeah.

**Speaker C:** Okay.

**Speaker B:** So, so I guess what we're doing is the um, so like the flow, so we so we have the uh the chat interface, um I guess we just kind of use like a, I don't know, like a very basic front end or we just kind of like hack, yeah we can have the component interface, we can...

**Speaker A:** You don't even need a chat interface maybe. It would be nice if we had just a voice kind of thing. Yeah. Yeah, but I mean first of all we need to figure out what we build, right? What is the niche case and then we figure out how do we populate or how do we interact with it. Okay. Because maybe we just put in a company name and it searches like all similar ones or so. It can also work.

**Speaker B:** Okay. So we definitely need um a database or I guess we have to find, figure out like what the database looks like. Um we need the uh the back end logic that kind of um serves as the uh the interface between our chat interface and the database. Not a problem. Um yeah and that's basically, and then we just kind of figure out the API calls to the chat. That will be also fine. Yeah.

**Speaker C:** So what I understood is uh in our first milestone we can hit a client interacting with an application. Um according to requirements he get the list of companies. That's all, right? That's the end goal, right?

**Speaker B:** Yeah, yeah.

**Speaker C:** And it does also notifies the enterprises that are listed upon the database.

**Speaker B:** Okay.

**Speaker C:** It could be.

**Speaker A:** So it's basically a sourcing solution if we find other companies.

**Speaker B:** Yeah and then we can kind of build out like more agentic things, tools from there. Yeah.

**Speaker A:** Yeah, but so data enrichment, what not. Yeah.

**Speaker C:** Okay. So what I understood is we need to first decide what, this can be one use case, basically data population. Yeah. Um, or data... data enrichment. Yeah. I guess um we can kind of figure out or like hack it with um, I don't know with uh kind of just having an agent that just kind of does a keyword searches on the database. Um kind of like through um I don't know it's called...

**Speaker C:** Semantic search?

**Speaker A:** I think you mean keyword because I would also say semantic...

**Speaker B:** It can be hybrid keyword plus...

**Speaker A:** I mentioned embedding the whole database of like all those companies in the US or so. Those are probably millions of companies.

**Speaker C:** Yeah it should be still be fast if we are...

**Speaker A:** Sorry?

**Speaker C:** You think it will it's reasonable to do? Because we also need to store those embeddings.

**Speaker B:** Yeah, it's fine. Like we are storing millions so it should be enough, like it should give results in few seconds. One or two.

**Speaker A:** I mean we could also start off with like just doing it in San Francisco or so or doing it in this county.

**Speaker B:** Yeah. Yeah, that would be fine. I think always to up the ante.

**Speaker A:** Yeah. Yeah. Probably hard, but let's see whether we can access that data.

**Speaker B:** Okay. I'm pretty sure in Germany you couldn't access that data. Probably pretty hard to find. Yeah. Um, okay, so data enrichments, um so we're doing a semantic search or like the keywords. Um yeah. It's a requirement, I guess.

**Speaker A:** I mean if you want something functional. Yeah. It's kind of getting there.

**Speaker C:** I think we are also a bit at the stage where we build three things actually. Uh, like I'm just confused about like how, how will be the interaction of a user with the platform? So like I, I'm not too much in sales so I just went out. So what I understood is it's something like a we are buying from an bigger enterprises. So what will be my flow? Like how we are uh like putting that into an agentic space? Like what what something else we are bringing than a normal like what I understood is like we are having bunch of databases of company and it's just something sitting which I'm asking question for my requirements and it's kind of giving me suggestions or also it's updating someone else that I'm a potential lead. Is that correct or there's something else that we are up to?

**Speaker A:** So the idea would be that the user chats through it with some Slack or so. And then the tool calls on the LLM decide what to do.

**Speaker B:** That I understood. He he does something to figure out to give me uh like a list of companies along with my specs that I'm asking about. Exactly. That answers it. But what I'm thinking is uh it's still easily be done today as well with web search. So might not be that complex.

**Speaker A:** There's yeah it can be done a lot with web search but it also populates the table and decides when to...

**Speaker B:** Okay we can have this ecosystem to be built for an enterprises to identify leads. Well also we want to have a uniform presentation of the data so it'd probably be, like a web search probably wouldn't be the most optimal for that since you kind of have to like parse through like natural language, different marketing what nots and all that. Whereas if you use a database it's kind of all in like a uniform presentation. It's kind of reduces the complexity of these uh of these uh operations.

**Speaker C:** I guess like maybe there are two things or one thing we need to decide. One is do we want to have a mini or like a co-pilot or helper, an intern that does little tasks such as, "Hey, for this lead, I just talked with it and note down they are not interested." And then it populates the table from the information I get and there's some smaller web search things and so on, but like smaller tools. Or we do something more complicated which is for example looking through all the um so doing a semantic or keyword search and so on and finding similar companies or leads and sourcing. So it's called sourcing basically. And this would be something completely different because it's one bigger project. So do we want to have like a small... something that can do many things and we have a cool chat interface and um we can just like talk to it and so on. Or do we want to have one thing where we have a front end and we put in I don't know, a company name and it searches everything itself and like we have this one use case. I think those are three, four small use cases and the thing with semantic search given the time today is probably one bigger use case that we make great.

**Speaker B:** Okay. I think that's something we need to decide. Um, I guess for a hackathon it just, I mean in terms of like um our like ability to compete with like other teams. I guess like the in terms of like the presentability of the idea or like the value um... I mean I don't know, I've like kind of thought about this, but is it, I guess is it better to have something that's more niche for like a certain use case or kind of more broad for like multiple use cases? Um but that's less, less um good at each one.

**Speaker C:** Yeah, same. Yeah, not the same thoughts. And that's exactly what we need to decide.

**Speaker B:** Yeah. What are your opinions on it?

**Speaker C:** Having a niche would be good because we'll be able to show a value proposition by EOD because going broad will, I don't know, because I have failed in a lot of hackathons by going broad because it it takes time sometimes, so we are not able to show the value proposition at end. So having a...

**Speaker A:** Yeah, maybe let's go niche because in the end when we go broad, and we build this, this can be ChatGPT connected to Zapier. Okay. Probably that's not so valuable. Yeah. Let's go niche.

**Speaker B:** Well then we can also kind of like expand upon in a niche if we have time. Yeah.

**Speaker C:** Okay.

**Speaker B:** So, so I guess what we're doing is the um, so like the flow, so we so we have the uh the chat interface, um I guess we just kind of use like a, I don't know, like a very basic front end or we just kind of like hack, yeah we can have the component interface, we can...

**Speaker A:** You don't even need a chat interface maybe. It would be nice if we had just a voice kind of thing. Yeah. Yeah, but I mean first of all we need to figure out what we build, right? What is the niche case and then we figure out how do we populate or how do we interact with it. Okay. Because maybe we just put in a company name and it searches like all similar ones or so. It can also work.

**Speaker B:** Okay. So we definitely need um a database or I guess we have to find, figure out like what the database looks like. Um we need the uh the back end logic that kind of um serves as the uh the interface between our chat interface and the database. Not a problem. Um yeah and that's basically, and then we just kind of figure out the API calls to the chat. That will be also fine. Yeah.

**Speaker C:** So what I understood is uh in our first milestone we can hit a client interacting with an application. Um according to requirements he get the list of companies. That's all, right? That's the end goal, right?

**Speaker B:** Yeah, yeah.

**Speaker C:** And it does also notifies the enterprises that are listed upon the database.

**Speaker B:** Okay.

**Speaker C:** It could be.

**Speaker A:** So it's basically a sourcing solution if we find other companies.

**Speaker B:** Yeah and then we can kind of build out like more agentic things, tools from there. Yeah.

**Speaker A:** Yeah, but so data enrichment, what not. Yeah.

**Speaker C:** Okay. So what I understood is we need to first decide what, this can be one use case, basically data population. Yeah. Um, or data... data enrichment. Yeah. I guess um we can kind of figure out or like hack it with um, I don't know with uh kind of just having an agent that just kind of does a keyword searches on the database. Um kind of like through um I don't know it's called...

**Speaker C:** Semantic search?

**Speaker A:** I think you mean keyword because I would also say semantic...

**Speaker B:** It can be hybrid keyword plus...

**Speaker A:** I mentioned embedding the whole database of like all those companies in the US or so. Those are probably millions of companies.

**Speaker C:** Yeah it should be still be fast if we are...

**Speaker A:** Sorry?

**Speaker C:** You think it will it's reasonable to do? Because we also need to store those embeddings.

**Speaker B:** Yeah, it's fine. Like we are storing millions so it should be enough, like it should give results in few seconds. One or two.

**Speaker A:** I mean we could also start off with like just doing it in San Francisco or so or doing it in this county.

**Speaker B:** Yeah. Yeah, that would be fine. I think always to up the ante.

**Speaker A:** Yeah. Yeah. Probably hard, but let's see whether we can access that data.

**Speaker B:** Okay. I'm pretty sure in Germany you couldn't access that data. Probably pretty hard to find. Yeah. Um, okay, so data enrichments, um so we're doing a semantic search or like the keywords. Um yeah. It's a requirement, I guess.

**Speaker A:** I mean if you want something functional. Yeah. It's kind of getting there.

**Speaker C:** I think we are also a bit at the stage where we build three things actually. Uh, like I'm just confused about like how, how will be the interaction of a user with the platform? So like I, I'm not too much in sales so I just went out. So what I understood is it's something like a we are buying from an bigger enterprises. So what will be my flow? Like how we are uh like putting that into an agentic space? Like what what something else we are bringing than a normal like what I understood is like we are having bunch of databases of company and it's just something sitting which I'm asking question for my requirements and it's kind of giving me suggestions or also it's updating someone else that I'm a potential lead. Is that correct or there's something else that we are up to?

**Speaker A:** So the idea would be that the user chats through it with some Slack or so. And then the tool calls on the LLM decide what to do.

**Speaker B:** That I understood. He he does something to figure out to give me uh like a list of companies along with my specs that I'm asking about. Exactly. That answers it. But what I'm thinking is uh it's still easily be done today as well with web search. So might not be that complex.

**Speaker A:** There's yeah it can be done a lot with web search but it also populates the table and decides when to...

**Speaker B:** Okay we can have this ecosystem to be built for an enterprises to identify leads. Well also we want to have a uniform presentation of the data so it'd probably be, like a web search probably wouldn't be the most optimal for that since you kind of have to like parse through like natural language, different marketing what nots and all that. Whereas if you use a database it's kind of all in like a uniform presentation. It's kind of reduces the complexity of these uh of these uh operations.

**Speaker C:** I guess like maybe there are two things or one thing we need to decide. One is do we want to have a mini or like a co-pilot or helper, an intern that does little tasks such as, "Hey, for this lead, I just talked with it and note down they are not interested." And then it populates the table from the information I get and there's some smaller web search things and so on, but like smaller tools. Or we do something more complicated which is for example looking through all the um so doing a semantic or keyword search and so on and finding similar companies or leads and sourcing. So it's called sourcing basically. And this would be something completely different because it's one bigger project. So do we want to have like a small... something that can do many things and we have a cool chat interface and um we can just like talk to it and so on. Or do we want to have one thing where we have a front end and we put in I don't know, a company name and it searches everything itself and like we have this one use case. I think those are three, four small use cases and the thing with semantic search given the time today is probably one bigger use case that we make great.

**Speaker B:** Okay. I think that's something we need to decide. Um, I guess for a hackathon it just, I mean in terms of like um our like ability to compete with like other teams. I guess like the in terms of like the presentability of the idea or like the value um... I mean I don't know, I've like kind of thought about this, but is it, I guess is it better to have something that's more niche for like a certain use case or kind of more broad for like multiple use cases? Um but that's less, less um good at each one.

**Speaker C:** Yeah, same. Yeah, not the same thoughts. And that's exactly what we need to decide.

**Speaker B:** Yeah. What are your opinions on it?

**Speaker C:** Having a niche would be good because we'll be able to show a value proposition by EOD because going broad will, I don't know, because I have failed in a lot of hackathons by going broad because it it takes time sometimes, so we are not able to show the value proposition at end. So having a...

**Speaker A:** Yeah, maybe let's go niche because in the end when we go broad, and we build this, this can be ChatGPT connected to Zapier. Okay. Probably that's not so valuable. Yeah. Let's go niche.

**Speaker B:** Well then we can also kind of like expand upon in a niche if we have time. Yeah.

**Speaker C:** Okay.

**Speaker B:** So, so I guess what we're doing is the um, so like the flow, so we so we have the uh the chat interface, um I guess we just kind of use like a, I don't know, like a very basic front end or we just kind of like hack, yeah we can have the component interface, we can...

**Speaker A:** You don't even need a chat interface maybe. It would be nice if we had just a voice kind of thing. Yeah. Yeah, but I mean first of all we need to figure out what we build, right? What is the niche case and then we figure out how do we populate or how do we interact with it. Okay. Because maybe we just put in a company name and it searches like all similar ones or so. It can also work.

**Speaker B:** Okay. So we definitely need um a database or I guess we have to find, figure out like what the database looks like. Um we need the uh the back end logic that kind of um serves as the uh the interface between our chat interface and the database. Not a problem. Um yeah and that's basically, and then we just kind of figure out the API calls to the chat. That will be also fine. Yeah.

**Speaker C:** So what I understood is uh in our first milestone we can hit a client interacting with an application. Um according to requirements he get the list of companies. That's all, right? That's the end goal, right?

**Speaker B:** Yeah, yeah.

**Speaker C:** And it does also notifies the enterprises that are listed upon the database.

**Speaker B:** Okay.

**Speaker C:** It could be.

**Speaker A:** So it's basically a sourcing solution if we find other companies.

**Speaker B:** Yeah and then we can kind of build out like more agentic things, tools from there. Yeah.

**Speaker A:** Yeah, but so data enrichment, what not. Yeah.

**Speaker C:** Okay. So what I understood is we need to first decide what, this can be one use case, basically data population. Yeah. Um, or data... data enrichment. Yeah. I guess um we can kind of figure out or like hack it with um, I don't know with uh kind of just having an agent that just kind of does a keyword searches on the database. Um kind of like through um I don't know it's called...

**Speaker C:** Semantic search?

**Speaker A:** I think you mean keyword because I would also say semantic...

**Speaker B:** It can be hybrid keyword plus...

**Speaker A:** I mentioned embedding the whole database of like all those companies in the US or so. Those are probably millions of companies.

**Speaker C:** Yeah it should be still be fast if we are...

**Speaker A:** Sorry?

**Speaker C:** You think it will it's reasonable to do? Because we also need to store those embeddings.

**Speaker B:** Yeah, it's fine. Like we are storing millions so it should be enough, like it should give results in few seconds. One or two.

**Speaker A:** I mean we could also start off with like just doing it in San Francisco or so or doing it in this county.

**Speaker B:** Yeah. Yeah, that would be fine. I think always to up the ante.

**Speaker A:** Yeah. Yeah. Probably hard, but let's see whether we can access that data.

**Speaker B:** Okay. I'm pretty sure in Germany you couldn't access that data. Probably pretty hard to find. Yeah. Um, okay, so data enrichments, um so we're doing a semantic search or like the keywords. Um yeah. It's a requirement, I guess.

**Speaker A:** I mean if you want something functional. Yeah. It's kind of getting there.

**Speaker C:** I think we are also a bit at the stage where we build three things actually. Uh, like I'm just confused about like how, how will be the interaction of a user with the platform? So like I, I'm not too much in sales so I just went out. So what I understood is it's something like a we are buying from an bigger enterprises. So what will be my flow? Like how we are uh like putting that into an agentic space? Like what what something else we are bringing than a normal like what I understood is like we are having bunch of databases of company and it's just something sitting which I'm asking question for my requirements and it's kind of giving me suggestions or also it's updating someone else that I'm a potential lead. Is that correct or there's something else that we are up to?

**Speaker A:** So the idea would be that the user chats through it with some Slack or so. And then the tool calls on the LLM decide what to do.

**Speaker B:** That I understood. He he does something to figure out to give me uh like a list of companies along with my specs that I'm asking about. Exactly. That answers it. But what I'm thinking is uh it's still easily be done today as well with web search. So might not be that complex.

**Speaker A:** There's yeah it can be done a lot with web search but it also populates the table and decides when to...

**Speaker B:** Okay we can have this ecosystem to be built for an enterprises to identify leads. Well also we want to have a uniform presentation of the data so it'd probably be, like a web search probably wouldn't be the most optimal for that since you kind of have to like parse through like natural language, different marketing what nots and all that. Whereas if you use a database it's kind of all in like a uniform presentation. It's kind of reduces the complexity of these uh of these uh operations.

**Speaker C:** I guess like maybe there are two things or one thing we need to decide. One is do we want to have a mini or like a co-pilot or helper, an intern that does little tasks such as, "Hey, for this lead, I just talked with it and note down they are not interested." And then it populates the table from the information I get and there's some smaller web search things and so on, but like smaller tools. Or we do something more complicated which is for example looking through all the um so doing a semantic or keyword search and so on and finding similar companies or leads and sourcing. So it's called sourcing basically. And this would be something completely different because it's one bigger project. So do we want to have like a small... something that can do many things and we have a cool chat interface and um we can just like talk to it and so on. Or do we want to have one thing where we have a front end and we put in I don't know, a company name and it searches everything itself and like we have this one use case. I think those are three, four small use cases and the thing with semantic search given the time today is probably one bigger use case that we make great.

**Speaker B:** Okay. I think that's something we need to decide. Um, I guess for a hackathon it just, I mean in terms of like um our like ability to compete with like other teams. I guess like the in terms of like the presentability of the idea or like the value um... I mean I don't know, I've like kind of thought about this, but is it, I guess is it better to have something that's more niche for like a certain use case or kind of more broad for like multiple use cases? Um but that's less, less um good at each one.

**Speaker C:** Yeah, same. Yeah, not the same thoughts. And that's exactly what we need to decide.

**Speaker B:** Yeah. What are your opinions on it?

**Speaker C:** Having a niche would be good because we'll be able to show a value proposition by EOD because going broad will, I don't know, because I have failed in a lot of hackathons by going broad because it it takes time sometimes, so we are not able to show the value proposition at end. So having a...

**Speaker A:** Yeah, maybe let's go niche because in the end when we go broad, and we build this, this can be ChatGPT connected to Zapier. Okay. Probably that's not so valuable. Yeah. Let's go niche.

**Speaker B:** Well then we can also kind of like expand upon in a niche if we have time. Yeah.

**Speaker C:** Okay.

**Speaker B:** So, so I guess what we're doing is the um, so like the flow, so we so we have the uh the chat interface, um I guess we just kind of use like a, I don't know, like a very basic front end or we just kind of like hack, yeah we can have the component interface, we can...

**Speaker A:** You don't even need a chat interface maybe. It would be nice if we had just a voice kind of thing. Yeah. Yeah, but I mean first of all we need to figure out what we build, right? What is the niche case and then we figure out how do we populate or how do we interact with it. Okay. Because maybe we just put in a company name and it searches like all similar ones or so. It can also work.

**Speaker B:** Okay. So we definitely need um a database or I guess we have to find, figure out like what the database looks like. Um we need the uh the back end logic that kind of um serves as the uh the interface between our chat interface and the database. Not a problem. Um yeah and that's basically, and then we just kind of figure out the API calls to the chat. That will be also fine. Yeah.

**Speaker C:** So what I understood is uh in our first milestone we can hit a client interacting with an application. Um according to requirements he get the list of companies. That's all, right? That's the end goal, right?

**Speaker B:** Yeah, yeah.

**Speaker C:** And it does also notifies the enterprises that are listed upon the database.

**Speaker B:** Okay.

**Speaker C:** It could be.

**Speaker A:** So it's basically a sourcing solution if we find other companies.

**Speaker B:** Yeah and then we can kind of build out like more agentic things, tools from there. Yeah.

**Speaker A:** Yeah, but so data enrichment, what not. Yeah.

**Speaker C:** Okay. So what I understood is we need to first decide what, this can be one use case, basically data population. Yeah. Um, or data... data enrichment. Yeah. I guess um we can kind of figure out or like hack it with um, I don't know with uh kind of just having an agent that just kind of does a keyword searches on the database. Um kind of like through um I don't know it's called...

**Speaker C:** Semantic search?

**Speaker A:** I think you mean keyword because I would also say semantic...

**Speaker B:** It can be hybrid keyword plus...

**Speaker A:** I mentioned embedding the whole database of like all those companies in the US or so. Those are probably millions of companies.

**Speaker C:** Yeah it should be still be fast if we are...

**Speaker A:** Sorry?

**Speaker C:** You think it will it's reasonable to do? Because we also need to store those embeddings.

**Speaker B:** Yeah, it's fine. Like we are storing millions so it should be enough, like it should give results in few seconds. One or two.

**Speaker A:** I mean we could also start off with like just doing it in San Francisco or so or doing it in this county.

**Speaker B:** Yeah. Yeah, that would be fine. I think always to up the ante.

**Speaker A:** Yeah. Yeah. Probably hard, but let's see whether we can access that data.

**Speaker B:** Okay. I'm pretty sure in Germany you couldn't access that data. Probably pretty hard to find. Yeah. Um, okay, so data enrichments, um so we're doing a semantic search or like the keywords. Um yeah. It's a requirement, I guess.

**Speaker A:** I mean if you want something functional. Yeah. It's kind of getting there.

**Speaker C:** I think we are also a bit at the stage where we build three things actually. Uh, like I'm just confused about like how, how will be the interaction of a user with the platform? So like I, I'm not too much in sales so I just went out. So what I understood is it's something like a we are buying from an bigger enterprises. So what will be my flow? Like how we are uh like putting that into an agentic space? Like what what something else we are bringing than a normal like what I understood is like we are having bunch of databases of company and it's just something sitting which I'm asking question for my requirements and it's kind of giving me suggestions or also it's updating someone else that I'm a potential lead. Is that correct or there's something else that we are up to?

**Speaker A:** So the idea would be that the user chats through it with some Slack or so. And then the tool calls on the LLM decide what to do.

**Speaker B:** That I understood. He he does something to figure out to give me uh like a list of companies along with my specs that I'm asking about. Exactly. That answers it. But what I'm thinking is uh it's still easily be done today as well with web search. So might not be that complex.

**Speaker A:** There's yeah it can be done a lot with web search but it also populates the table and decides when to...

**Speaker B:** Okay we can have this ecosystem to be built for an enterprises to identify leads. Well also we want to have a uniform presentation of the data so it'd probably be, like a web search probably wouldn't be the most optimal for that since you kind of have to like parse through like natural language, different marketing what nots and all that. Whereas if you use a database it's kind of all in like a uniform presentation. It's kind of reduces the complexity of these uh of these uh operations.

**Speaker C:** I guess like maybe there are two things or one thing we need to decide. One is do we want to have a mini or like a co-pilot or helper, an intern that does little tasks such as, "Hey, for this lead, I just talked with it and note down they are not interested." And then it populates the table from the information I get and there's some smaller web search things and so on, but like smaller tools. Or we do something more complicated which is for example looking through all the um so doing a semantic or keyword search and so on and finding similar companies or leads and sourcing. So it's called sourcing basically. And this would be something completely different because it's one bigger project. So do we want to have like a small... something that can do many things and we have a cool chat interface and um we can just like talk to it and so on. Or do we want to have one thing where we have a front end and we put in I don't know, a company name and it searches everything itself and like we have this one use case. I think those are three, four small use cases and the thing with semantic search given the time today is probably one bigger use case that we make great.

**Speaker B:** Okay. I think that's something we need to decide. Um, I guess for a hackathon it just, I mean in terms of like um our like ability to compete with like other teams. I guess like the in terms of like the presentability of the idea or like the value um... I mean I don't know, I've like kind of thought about this, but is it, I guess is it better to have something that's more niche for like a certain use case or kind of more broad for like multiple use cases? Um but that's less, less um good at each one.

**Speaker C:** Yeah, same. Yeah, not the same thoughts. And that's exactly what we need to decide.

**Speaker B:** Yeah. What are your opinions on it?

**Speaker C:** Having a niche would be good because we'll be able to show a value proposition by EOD because going broad will, I don't know, because I have failed in a lot of hackathons by going broad because it it takes time sometimes, so we are not able to show the value proposition at end. So having a...

**Speaker A:** Yeah, maybe let's go niche because in the end when we go broad, and we build this, this can be ChatGPT connected to Zapier. Okay. Probably that's not so valuable. Yeah. Let's go niche.

**Speaker B:** Well then we can also kind of like expand upon in a niche if we have time. Yeah.

**Speaker C:** Okay.

**Speaker B:** So, so I guess what we're doing is the um, so like the flow, so we so we have the uh the chat interface, um I guess we just kind of use like a, I don't know, like a very basic front end or we just kind of like hack, yeah we can have the component interface, we can...

**Speaker A:** You don't even need a chat interface maybe. It would be nice if we had just a voice kind of thing. Yeah. Yeah, but I mean first of all we need to figure out what we build, right? What is the niche case and then we figure out how do we populate or how do we interact with it. Okay. Because maybe we just put in a company name and it searches like all similar ones or so. It can also work.

**Speaker B:** Okay. So we definitely need um a database or I guess we have to find, figure out like what the database looks like. Um we need the uh the back end logic that kind of um serves as the uh the interface between our chat interface and the database. Not a problem. Um yeah and that's basically, and then we just kind of figure out the API calls to the chat. That will be also fine. Yeah.

**Speaker C:** So what I understood is uh in our first milestone we can hit a client interacting with an application. Um according to requirements he get the list of companies. That's all, right? That's the end goal, right?

**Speaker B:** Yeah, yeah.

**Speaker C:** And it does also notifies the enterprises that are listed upon the database.

**Speaker B:** Okay.

**Speaker C:** It could be.

**Speaker A:** So it's basically a sourcing solution if we find other companies.

**Speaker B:** Yeah and then we can kind of build out like more agentic things, tools from there. Yeah.

**Speaker A:** Yeah, but so data enrichment, what not. Yeah.

**Speaker C:** Okay. So what I understood is we need to first decide what, this can be one use case, basically data population. Yeah. Um, or data... data enrichment. Yeah. I guess um we can kind of figure out or like hack it with um, I don't know with uh kind of just having an agent that just kind of does a keyword searches on the database. Um kind of like through um I don't know it's called...

**Speaker C:** Semantic search?

**Speaker A:** I think you mean keyword because I would also say semantic...

**Speaker B:** It can be hybrid keyword plus...

**Speaker A:** I mentioned embedding the whole database of like all those companies in the US or so. Those are probably millions of companies.

**Speaker C:** Yeah it should be still be fast if we are...

**Speaker A:** Sorry?

**Speaker C:** You think it will it's reasonable to do? Because we also need to store those embeddings.

**Speaker B:** Yeah, it's fine. Like we are storing millions so it should be enough, like it should give results in few seconds. One or two.

**Speaker A:** I mean we could also start off with like just doing it in San Francisco or so or doing it in this county.

**Speaker B:** Yeah. Yeah, that would be fine. I think always to up the ante.

**Speaker A:** Yeah. Yeah. Probably hard, but let's see whether we can access that data.

**Speaker B:** Okay. I'm pretty sure in Germany you couldn't access that data. Probably pretty hard to find. Yeah. Um, okay, so data enrichments, um so we're doing a semantic search or like the keywords. Um yeah. It's a requirement, I guess.

**Speaker A:** I mean if you want something functional. Yeah. It's kind of getting there.

**Speaker C:** I think we are also a bit at the stage where we build three things actually. Uh, like I'm just confused about like how, how will be the interaction of a user with the platform? So like I, I'm not too much in sales so I just went out. So what I understood is it's something like a we are buying from an bigger enterprises. So what will be my flow? Like how we are uh like putting that into an agentic space? Like what what something else we are bringing than a normal like what I understood is like we are having bunch of databases of company and it's just something sitting which I'm asking question for my requirements and it's kind of giving me suggestions or also it's updating someone else that I'm a potential lead. Is that correct or there's something else that we are up to?

**Speaker A:** So the idea would be that the user chats through it with some Slack or so. And then the tool calls on the LLM decide what to do.

**Speaker B:** That I understood. He he does something to figure out to give me uh like a list of companies along with my specs that I'm asking about. Exactly. That answers it. But what I'm thinking is uh it's still easily be done today as well with web search. So might not be that complex.

**Speaker A:** There's yeah it can be done a lot with web search but it also populates the table and decides when to...

**Speaker B:** Okay we can have this ecosystem to be built for an enterprises to identify leads. Well also we want to have a uniform presentation of the data so it'd probably be, like a web search probably wouldn't be the most optimal for that since you kind of have to like parse through like natural language, different marketing what nots and all that. Whereas if you use a database it's kind of all in like a uniform presentation. It's kind of reduces the complexity of these uh of these uh operations.

**Speaker C:** I guess like maybe there are two things or one thing we need to decide. One is do we want to have a mini or like a co-pilot or helper, an intern that does little tasks such as, "Hey, for this lead, I just talked with it and note down they are not interested." And then it populates the table from the information I get and there's some smaller web search things and so on, but like smaller tools. Or we do something more complicated which is for example looking through all the um so doing a semantic or keyword search and so on and finding similar companies or leads and sourcing. So it's called sourcing basically. And this would be something completely different because it's one bigger project. So do we want to have like a small... something that can do many things and we have a cool chat interface and um we can just like talk to it and so on. Or do we want to have one thing where we have a front end and we put in I don't know, a company name and it searches everything itself and like we have this one use case. I think those are three, four small use cases and the thing with semantic search given the time today is probably one bigger use case that we make great.

**Speaker B:** Okay. I think that's something we need to decide. Um, I guess for a hackathon it just, I mean in terms of like um our like ability to compete with like other teams. I guess like the in terms of like the presentability of the idea or like the value um... I mean I don't know, I've like kind of thought about this, but is it, I guess is it better to have something that's more niche for like a certain use case or kind of more broad for like multiple use cases? Um but that's less, less um good at each one.

**Speaker C:** Yeah, same. Yeah, not the same thoughts. And that's exactly what we need to decide.

**Speaker B:** Yeah. What are your opinions on it?

**Speaker C:** Having a niche would be good because we'll be able to show a value proposition by EOD because going broad will, I don't know, because I have failed in a lot of hackathons by going broad because it it takes time sometimes, so we are not able to show the value proposition at end. So having a...

**Speaker A:** Yeah, maybe let's go niche because in the end when we go broad, and we build this, this can be ChatGPT connected to Zapier. Okay. Probably that's not so valuable. Yeah. Let's go niche.

**Speaker B:** Well then we can also kind of like expand upon in a niche if we have time. Yeah.

**Speaker C:** Okay.

**Speaker B:** So, so I guess what we're doing is the um, so like the flow, so we so we have the uh the chat interface, um I guess we just kind of use like a, I don't know, like a very basic front end or we just kind of like hack, yeah we can have the component interface, we can...

**Speaker A:** You don't even need a chat interface maybe. It would be nice if we had just a voice kind of thing. Yeah. Yeah, but I mean first of all we need to figure out what we build, right? What is the niche case and then we figure out how do we populate or how do we interact with it. Okay. Because maybe we just put in a company name and it searches like all similar ones or so. It can also work.

**Speaker B:** Okay. So we definitely need um a database or I guess we have to find, figure out like what the database looks like. Um we need the uh the back end logic that kind of um serves as the uh the interface between our chat interface and the database. Not a problem. Um yeah and that's basically, and then we just kind of figure out the API calls to the chat. That will be also fine. Yeah.

**Speaker C:** So what I understood is uh in our first milestone we can hit a client interacting with an application. Um according to requirements he get the list of companies. That's all, right? That's the end goal, right?

**Speaker B:** Yeah, yeah.

**Speaker C:** And it does also notifies the enterprises that are listed upon the database.

**Speaker B:** Okay.

**Speaker C:** It could be.

**Speaker A:** So it's basically a sourcing solution if we find other companies.

**Speaker B:** Yeah and then we can kind of build out like more agentic things, tools from there. Yeah.

**Speaker A:** Yeah, but so data enrichment, what not. Yeah.

**Speaker C:** Okay. So what I understood is we need to first decide what, this can be one use case, basically data population. Yeah. Um, or data... data enrichment. Yeah. I guess um we can kind of figure out or like hack it with um, I don't know with uh kind of just having an agent that just kind of does a keyword searches on the database. Um kind of like through um I don't know it's called...

**Speaker C:** Semantic search?

**Speaker A:** I think you mean keyword because I would also say semantic...

**Speaker B:** It can be hybrid keyword plus...

**Speaker A:** I mentioned embedding the whole database of like all those companies in the US or so. Those are probably millions of companies.

**Speaker C:** Yeah it should be still be fast if we are...

**Speaker A:** Sorry?

**Speaker C:** You think it will it's reasonable to do? Because we also need to store those embeddings.

**Speaker B:** Yeah, it's fine. Like we are storing millions so it should be enough, like it should give results in few seconds. One or two.

**Speaker A:** I mean we could also start off with like just doing it in San Francisco or so or doing it in this county.

**Speaker B:** Yeah. Yeah, that would be fine. I think always to up the ante.

**Speaker A:** Yeah. Yeah. Probably hard, but let's see whether we can access that data.

**Speaker B:** Okay. I'm pretty sure in Germany you couldn't access that data. Probably pretty hard to find. Yeah. Um, okay, so data enrichments, um so we're doing a semantic search or like the keywords. Um yeah. It's a requirement, I guess.

**Speaker A:** I mean if you want something functional. Yeah. It's kind of getting there.

**Speaker C:** I think we are also a bit at the stage where we build three things actually. Uh, like I'm just confused about like how, how will be the interaction of a user with the platform? So like I, I'm not too much in sales so I just went out. So what I understood is it's something like a we are buying from an bigger enterprises. So what will be my flow? Like how we are uh like putting that into an agentic space? Like what what something else we are bringing than a normal like what I understood is like we are having bunch of databases of company and it's just something sitting which I'm asking question for my requirements and it's kind of giving me suggestions or also it's updating someone else that I'm a potential lead. Is that correct or there's something else that we are up to?

**Speaker A:** So the idea would be that the user chats through it with some Slack or so. And then the tool calls on the LLM decide what to do.

**Speaker B:** That I understood. He he does something to figure out to give me uh like a list of companies along with my specs that I'm asking about. Exactly. That answers it. But what I'm thinking is uh it's still easily be done today as well with web search. So might not be that complex.

**Speaker A:** There's yeah it can be done a lot with web search but it also populates the table and decides when to...

**Speaker B:** Okay we can have this ecosystem to be built for an enterprises to identify leads. Well also we want to have a uniform presentation of the data so it'd probably be, like a web search probably wouldn't be the most optimal for that since you kind of have to like parse through like natural language, different marketing what nots and all that. Whereas if you use a database it's kind of all in like a uniform presentation. It's kind of reduces the complexity of these uh of these uh operations.

**Speaker C:** I guess like maybe there are two things or one thing we need to decide. One is do we want to have a mini or like a co-pilot or helper, an intern that does little tasks such as, "Hey, for this lead, I just talked with it and note down they are not interested." And then it populates the table from the information I get and there's some smaller web search things and so on, but like smaller tools. Or we do something more complicated which is for example looking through all the um so doing a semantic or keyword search and so on and finding similar companies or leads and sourcing. So it's called sourcing basically. And this would be something completely different because it's one bigger project. So do we want to have like a small... something that can do many things and we have a cool chat interface and um we can just like talk to it and so on. Or do we want to have one thing where we have a front end and we put in I don't know, a company name and it searches everything itself and like we have this one use case. I think those are three, four small use cases and the thing with semantic search given the time today is probably one bigger use case that we make great.

**Speaker B:** Okay. I think that's something we need to decide. Um, I guess for a hackathon it just, I mean in terms of like um our like ability to compete with like other teams. I guess like the in terms of like the presentability of the idea or like the value um... I mean I don't know, I've like kind of thought about this, but is it, I guess is it better to have something that's more niche for like a certain use case or kind of more broad for like multiple use cases? Um but that's less, less um good at each one.

**Speaker C:** Yeah, same. Yeah, not the same thoughts. And that's exactly what we need to decide.

**Speaker B:** Yeah. What are your opinions on it?

**Speaker C:** Having a niche would be good because we'll be able to show a value proposition by EOD because going broad will, I don't know, because I have failed in a lot of hackathons by going broad because it it takes time sometimes, so we are not able to show the value proposition at end. So having a...

**Speaker A:** Yeah, maybe let's go niche because in the end when we go broad, and we build this, this can be ChatGPT connected to Zapier. Okay. Probably that's not so valuable. Yeah. Let's go niche.

**Speaker B:** Well then we can also kind of like expand upon in a niche if we have time. Yeah.

**Speaker C:** Okay.

**Speaker B:** So, so I guess what we're doing is the um, so like the flow, so we so we have the uh the chat interface, um I guess we just kind of use like a, I don't know, like a very basic front end or we just kind of like hack, yeah we can have the component interface, we can...

**Speaker A:** You don't even need a chat interface maybe. It would be nice if we had just a voice kind of thing. Yeah. Yeah, but I mean first of all we need to figure out what we build, right? What is the niche case and then we figure out how do we populate or how do we interact with it. Okay. Because maybe we just put in a company name and it searches like all similar ones or so. It can also work.

**Speaker B:** Okay. So we definitely need um a database or I guess we have to find, figure out like what the database looks like. Um we need the uh the back end logic that kind of um serves as the uh the interface between our chat interface and the database. Not a problem. Um yeah and that's basically, and then we just kind of figure out the API calls to the chat. That will be also fine. Yeah.

**Speaker C:** So what I understood is uh in our first milestone we can hit a client interacting with an application. Um according to requirements he get the list of companies. That's all, right? That's the end goal, right?

**Speaker B:** Yeah, yeah.

**Speaker C:** And it does also notifies the enterprises that are listed upon the database.

**Speaker B:** Okay.

**Speaker C:** It could be.

**Speaker A:** So it's basically a sourcing solution if we find other companies.

**Speaker B:** Yeah and then we can kind of build out like more agentic things, tools from there. Yeah.

**Speaker A:** Yeah, but so data enrichment, what not. Yeah.

**Speaker C:** Okay. So what I understood is we need to first decide what, this can be one use case, basically data population. Yeah. Um, or data... data enrichment. Yeah. I guess um we can kind of figure out or like hack it with um, I don't know with uh kind of just having an agent that just kind of does a keyword searches on the database. Um kind of like through um I don't know it's called...

**Speaker C:** Semantic search?

**Speaker A:** I think you mean keyword because I would also say semantic...

**Speaker B:** It can be hybrid keyword plus...

**Speaker A:** I mentioned embedding the whole database of like all those companies in the US or so. Those are probably millions of companies.

**Speaker C:** Yeah it should be still be fast if we are...

**Speaker A:** Sorry?

**Speaker C:** You think it will it's reasonable to do? Because we also need to store those embeddings.

**Speaker B:** Yeah, it's fine. Like we are storing millions so it should be enough, like it should give results in few seconds. One or two.

**Speaker A:** I mean we could also start off with like just doing it in San Francisco or so or doing it in this county.

**Speaker B:** Yeah. Yeah, that would be fine. I think always to up the ante.

**Speaker A:** Yeah. Yeah. Probably hard, but let's see whether we can access that data.

**Speaker B:** Okay. I'm pretty sure in Germany you couldn't access that data. Probably pretty hard to find. Yeah. Um, okay, so data enrichments, um so we're doing a semantic search or like the keywords. Um yeah. It's a requirement, I guess.

**Speaker A:** I mean if you want something functional. Yeah. It's kind of getting there.

**Speaker C:** I think we are also a bit at the stage where we build three things actually. Uh, like I'm just confused about like how, how will be the interaction of a user with the platform? So like I, I'm not too much in sales so I just went out. So what I understood is it's something like a we are buying from an bigger enterprises. So what will be my flow? Like how we are uh like putting that into an agentic space? Like what what something else we are bringing than a normal like what I understood is like we are having bunch of databases of company and it's just something sitting which I'm asking question for my requirements and it's kind of giving me suggestions or also it's updating someone else that I'm a potential lead. Is that correct or there's something else that we are up to?

**Speaker A:** So the idea would be that the user chats through it with some Slack or so. And then the tool calls on the LLM decide what to do.

**Speaker B:** That I understood. He he does something to figure out to give me uh like a list of companies along with my specs that I'm asking about. Exactly. That answers it. But what I'm thinking is uh it's still easily be done today as well with web search. So might not be that complex.

**Speaker A:** There's yeah it can be done a lot with web search but it also populates the table and decides when to...

**Speaker B:** Okay we can have this ecosystem to be built for an enterprises to identify leads. Well also we want to have a uniform presentation of the data so it'd probably be, like a web search probably wouldn't be the most optimal for that since you kind of have to like parse through like natural language, different marketing what nots and all that. Whereas if you use a database it's kind of all in like a uniform presentation. It's kind of reduces the complexity of these uh of these uh operations.

**Speaker C:** I guess like maybe there are two things or one thing we need to decide. One is do we want to have a mini or like a co-pilot or helper, an intern that does little tasks such as, "Hey, for this lead, I just talked with it and note down they are not interested." And then it populates the table from the information I get and there's some smaller web search things and so on, but like smaller tools. Or we do something more complicated which is for example looking through all the um so doing a semantic or keyword search and so on and finding similar companies or leads and sourcing. So it's called sourcing basically. And this would be something completely different because it's one bigger project. So do we want to have like a small... something that can do many things and we have a cool chat interface and um we can just like talk to it and so on. Or do we want to have one thing where we have a front end and we put in I don't know, a company name and it searches everything itself and like we have this one use case. I think those are three, four small use cases and the thing with semantic search given the time today is probably one bigger use case that we make great.

**Speaker B:** Okay. I think that's something we need to decide. Um, I guess for a hackathon it just, I mean in terms of like um our like ability to compete with like other teams. I guess like the in terms of like the presentability of the idea or like the value um... I mean I don't know, I've like kind of thought about this, but is it, I guess is it better to have something that's more niche for like a certain use case or kind of more broad for like multiple use cases? Um but that's less, less um good at each one.

**Speaker C:** Yeah, same. Yeah, not the same thoughts. And that's exactly what we need to decide.

**Speaker B:** Yeah. What are your opinions on it?

**Speaker C:** Having a niche would be good because we'll be able to show a value proposition by EOD because going broad will, I don't know, because I have failed in a lot of hackathons by going broad because it it takes time sometimes, so we are not able to show the value proposition at end. So having a...

**Speaker A:** Yeah, maybe let's go niche because in the end when we go broad, and we build this, this can be ChatGPT connected to Zapier. Okay. Probably that's not so valuable. Yeah. Let's go niche.

**Speaker B:** Well then we can also kind of like expand upon in a niche if we have time. Yeah.

**Speaker C:** Okay.

**Speaker B:** So, so I guess what we're doing is the um, so like the flow, so we so we have the uh the chat interface, um I guess we just kind of use like a, I don't know, like a very basic front end or we just kind of like hack, yeah we can have the component interface, we can...

**Speaker A:** You don't even need a chat interface maybe. It would be nice if we had just a voice kind of thing. Yeah. Yeah, but I mean first of all we need to figure out what we build, right? What is the niche case and then we figure out how do we populate or how do we interact with it. Okay. Because maybe we just put in a company name and it searches like all similar ones or so. It can also work.

**Speaker B:** Okay. So we definitely need um a database or I guess we have to find, figure out like what the database looks like. Um we need the uh the back end logic that kind of um serves as the uh the interface between our chat interface and the database. Not a problem. Um yeah and that's basically, and then we just kind of figure out the API calls to the chat. That will be also fine. Yeah.

**Speaker C:** So what I understood is uh in our first milestone we can hit a client interacting with an application. Um according to requirements he get the list of companies. That's all, right? That's the end goal, right?

**Speaker B:** Yeah, yeah.

**Speaker C:** And it does also notifies the enterprises that are listed upon the database.

**Speaker B:** Okay.

**Speaker C:** It could be.

**Speaker A:** So it's basically a sourcing solution if we find other companies.

**Speaker B:** Yeah and then we can kind of build out like more agentic things, tools from there. Yeah.

**Speaker A:** Yeah, but so data enrichment, what not. Yeah.

**Speaker C:** Okay. So what I understood is we need to first decide what, this can be one use case, basically data population. Yeah. Um, or data... data enrichment. Yeah. I guess um we can kind of figure out or like hack it with um, I't know with uh kind of just having an agent that just kind of does a keyword searches on the database. Um kind of like through um I don't know it's called...

**Speaker C:** Semantic search?

**Speaker A:** I think you mean keyword because I would also say semantic...

**Speaker B:** It can be hybrid keyword plus...

**Speaker A:** I mentioned embedding the whole database of like all those companies in the US or so. Those are probably millions of companies.

**Speaker C:** Yeah it should be still be fast if we are...

**Speaker A:** Sorry?

**Speaker C:** You think it will it's reasonable to do? Because we also need to store those embeddings.

**Speaker B:** Yeah, it's fine. Like we are storing millions so it should be enough, like it should give results in few seconds. One or two.

**Speaker A:** I mean we could also start off with like just doing it in San Francisco or so or doing it in this county.

**Speaker B:** Yeah. Yeah, that would be fine. I think always to up the ante.

**Speaker A:** Yeah. Yeah. Probably hard, but let's see whether we can access that data.

**Speaker B:** Okay. I'm pretty sure in Germany you couldn't access that data. Probably pretty hard to find. Yeah. Um, okay, so data enrichments, um so we're doing a semantic search or like the keywords. Um yeah. It's a requirement, I guess.

**Speaker A:** I mean if you want something functional. Yeah. It's kind of getting there.

**Speaker C:** I think we are also a bit at the stage where we build three things actually. Uh, like I'm just confused about like how, how will be the interaction of a user with the platform? So like I, I'm not too much in sales so I just went out. So what I understood is it's something like a we are buying from an bigger enterprises. So what will be my flow? Like how we are uh like putting that into an agentic space? Like what what something else we are bringing than a normal like what I understood is like we are having bunch of databases of company and it's just something sitting which I'm asking question for my requirements and it's kind of giving me suggestions or also it's updating someone else that I'm a potential lead. Is that correct or there's something else that we are up to?

**Speaker A:** So the idea would be that the user chats through it with some Slack or so. And then the tool calls on the LLM decide what to do.

**Speaker B:** That I understood. He he does something to figure out to give me uh like a list of companies along with my specs that I'm asking about. Exactly. That answers it. But what I'm thinking is uh it's still easily be done today as well with web search. So might not be that complex.

**Speaker A:** There's yeah it can be done a lot with web search but it also populates the table and decides when to...

**Speaker B:** Okay we can have this ecosystem to be built for an enterprises to identify leads. Well also we want to have a uniform presentation of the data so it'd probably be, like a web search probably wouldn't be the most optimal for that since you kind of have to like parse through like natural language, different marketing what nots and all that. Whereas if you use a database it's kind of all in like a uniform presentation. It's kind of reduces the complexity of these uh of these uh operations.

**Speaker C:** I guess like maybe there are two things or one thing we need to decide. One is do we want to have a mini or like a co-pilot or helper, an intern that does little tasks such as, "Hey, for this lead, I just talked with it and note down they are not interested." And then it populates the table from the information I get and there's some smaller web search things and so on, but like smaller tools. Or we do something more complicated which is for example looking through all the um so doing a semantic or keyword search and so on and finding similar companies or leads and sourcing. So it's called sourcing basically. And this would be something completely different because it's one bigger project. So do we want to have like a small... something that can do many things and we have a cool chat interface and um we can just like talk to it and so on. Or do we want to have one thing where we have a front end and we put in I don't know, a company name and it searches everything itself and like we have this one use case. I think those are three, four small use cases and the thing with semantic search given the time today is probably one bigger use case that we make great.

**Speaker B:** Okay. I think that's something we need to decide. Um, I guess for a hackathon it just, I mean in terms of like um our like ability to compete with like other teams. I guess like the in terms of like the presentability of the idea or like the value um... I mean I don't know, I've like kind of thought about this, but is it, I guess is it better to have something that's more niche for like a certain use case or kind of more broad for like multiple use cases? Um but that's less, less um good at each one.

**Speaker C:** Yeah, same. Yeah, not the same thoughts. And that's exactly what we need to decide.

**Speaker B:** Yeah. What are your opinions on it?

**Speaker C:** Having a niche would be good because we'll be able to show a value proposition by EOD because going broad will, I don't know, because I have failed in a lot of hackathons by going broad because it it takes time sometimes, so we are not able to show the value proposition at end. So having a...

**Speaker A:** Yeah, maybe let's go niche because in the end when we go broad, and we build this, this can be ChatGPT connected to Zapier. Okay. Probably that's not so valuable. Yeah. Let's go niche.

**Speaker B:** Well then we can also kind of like expand upon in a niche if we have time. Yeah.

**Speaker C:** Okay.

**Speaker B:** So, so I guess what we're doing is the um, so like the flow, so we so we have the uh the chat interface, um I guess we just kind of use like a, I don't know, like a very basic front end or we just kind of like hack, yeah we can have the component interface, we can...

**Speaker A:** You don't even need a chat interface maybe. It would be nice if we had just a voice kind of thing. Yeah. Yeah, but I mean first of all we need to figure out what we build, right? What is the niche case and then we figure out how do we populate or how do we interact with it. Okay. Because maybe we just put in a company name and it searches like all similar ones or so. It can also work.

**Speaker B:** Okay. So we definitely need um a database or I guess we have to find, figure out like what the database looks like. Um we need the uh the back end logic that kind of um serves as the uh the interface between our chat interface and the database. Not a problem. Um yeah and that's basically, and then we just kind of figure out the API calls to the chat. That will be also fine. Yeah.

**Speaker C:** So what I understood is uh in our first milestone we can hit a client interacting with an application. Um according to requirements he get the list of companies. That's all, right? That's the end goal, right?

**Speaker B:** Yeah, yeah.

**Speaker C:** And it does also notifies the enterprises that are listed upon the database.

**Speaker B:** Okay.

**Speaker C:** It could be.

**Speaker A:** So it's basically a sourcing solution if we find other companies.

**Speaker B:** Yeah and then we can kind of build out like more agentic things, tools from there. Yeah.

**Speaker A:** Yeah, but so data enrichment, what not. Yeah.

**Speaker C:** Okay. So what I understood is we need to first decide what, this can be one use case, basically data population. Yeah. Um, or data... data enrichment. Yeah. I guess um we can kind of figure out or like hack it with um, I don't know with uh kind of just having an agent that just kind of does a keyword searches on the database. Um kind of like through um I don't know it's called...

**Speaker C:** Semantic search?

**Speaker A:** I think you mean keyword because I would also say semantic...

**Speaker B:** It can be hybrid keyword plus...

**Speaker A:** I mentioned embedding the whole database of like all those companies in the US or so. Those are probably millions of companies.

**Speaker C:** Yeah it should be still be fast if we are...

**Speaker A:** Sorry?

**Speaker C:** You think it will it's reasonable to do? Because we also need to store those embeddings.

**Speaker B:** Yeah, it's fine. Like we are storing millions so it should be enough, like it should give results in few seconds. One or two.

**Speaker A:** I mean we could also start off with like just doing it in San Francisco or so or doing it in this county.

**Speaker B:** Yeah. Yeah, that would be fine. I think always to up the ante.

**Speaker A:** Yeah. Yeah. Probably hard, but let's see whether we can access that data.

**Speaker B:** Okay. I'm pretty sure in Germany you couldn't access that data. Probably pretty hard to find. Yeah. Um, okay, so data enrichments, um so we're doing a semantic search or like the keywords. Um yeah. It's a requirement, I guess.

**Speaker A:** I mean if you want something functional. Yeah. It's kind of getting there.

**Speaker C:** I think we are also a bit at the stage where we build three things actually. Uh, like I'm just confused about like how, how will be the interaction of a user with the platform? So like I, I'm not too much in sales so I just went out. So what I understood is it's something like a we are buying from an bigger enterprises. So what will be my flow? Like how we are uh like putting that into an agentic space? Like what what something else we are bringing than a normal like what I understood is like we are having bunch of databases of company and it's just something sitting which I'm asking question for my requirements and it's kind of giving me suggestions or also it's updating someone else that I'm a potential lead. Is that correct or there's something else that we are up to?

**Speaker A:** So the idea would be that the user chats through it with some Slack or so. And then the tool calls on the LLM decide what to do.

**Speaker B:** That I understood. He he does something to figure out to give me uh like a list of companies along with my specs that I'm asking about. Exactly. That answers it. But what I'm thinking is uh it's still easily be done today as well with web search. So might not be that complex.

**Speaker A:** There's yeah it can be done a lot with web search but it also populates the table and decides when to...

**Speaker B:** Okay we can have this ecosystem to be built for an enterprises to identify leads. Well also we want to have a uniform presentation of the data so it'd probably be, like a web search probably wouldn't be the most optimal for that since you kind of have to like parse through like natural language, different marketing what nots and all that. Whereas if you use a database it's kind of all in like a uniform presentation. It's kind of reduces the complexity of these uh of these uh operations.

**Speaker C:** I guess like maybe there are two things or one thing we need to decide. One is do we want to have a mini or like a co-pilot or helper, an intern that does little tasks such as, "Hey, for this lead, I just talked with it and note down they are not interested." And then it populates the table from the information I get and there's some smaller web search things and so on, but like smaller tools. Or we do something more complicated which is for example looking through all the um so doing a semantic or keyword search and so on and finding similar companies or leads and sourcing. So it's called sourcing basically. And this would be something completely different because it's one bigger project. So do we want to have like a small... something that can do many things and we have a cool chat interface and um we can just like talk to it and so on. Or do we want to have one thing where we have a front end and we put in I don't know, a company name and it searches everything itself and like we have this one use case. I think those are three, four small use cases and the thing with semantic search given the time today is probably one bigger use case that we make great.

**Speaker B:** Okay. I think that's something we need to decide. Um, I guess for a hackathon it just, I mean in terms of like um our like ability to compete with like other teams. I guess like the in terms of like the presentability of the idea or like the value um... I mean I don't know, I've like kind of thought about this, but is it, I guess is it better to have something that's more niche for like a certain use case or kind of more broad for like multiple use cases? Um but that's less, less um good at each one.

**Speaker C:** Yeah, same. Yeah, not the same thoughts. And that's exactly what we need to decide.

**Speaker B:** Yeah. What are your opinions on it?

**Speaker C:** Having a niche would be good because we'll be able to show a value proposition by EOD because going broad will, I don't know, because I have failed in a lot of hackathons by going broad because it it takes time sometimes, so we are not able to show the value proposition at end. So having a...

**Speaker A:** Yeah, maybe let's go niche because in the end when we go broad, and we build this, this can be ChatGPT connected to Zapier. Okay. Probably that's not so valuable. Yeah. Let's go niche.

**Speaker B:** Well then we can also kind of like expand upon in a niche if we have time. Yeah.

**Speaker C:** Okay.

**Speaker B:** So, so I guess what we're doing is the um, so like the flow, so we so we have the uh the chat interface, um I guess we just kind of use like a, I don't know, like a very basic front end or we just kind of like hack, yeah we can have the component interface, we can...

**Speaker A:** You don't even need a chat interface maybe. It would be nice if we had just a voice kind of thing. Yeah. Yeah, but I mean first of all we need to figure out what we build, right? What is the niche case and then we figure out how do we populate or how do we interact with it. Okay. Because maybe we just put in a company name and it searches like all similar ones or so. It can also work.

**Speaker B:** Okay. So we definitely need um a database or I guess we have to find, figure out like what the database looks like. Um we need the uh the back end logic that kind of um serves as the uh the interface between our chat interface and the database. Not a problem. Um yeah and that's basically, and then we just kind of figure out the API calls to the chat. That will be also fine. Yeah.

**Speaker C:** So what I understood is uh in our first milestone we can hit a client interacting with an application. Um according to requirements he get the list of companies. That's all, right? That's the end goal, right?

**Speaker B:** Yeah, yeah.

**Speaker C:** And it does also notifies the enterprises that are listed upon the database.

**Speaker B:** Okay.

**Speaker C:** It could be.

**Speaker A:** So it's basically a sourcing solution if we find other companies.

**Speaker B:** Yeah and then we can kind of build out like more agentic things, tools from there. Yeah.

**Speaker A:** Yeah, but so data enrichment, what not. Yeah.

**Speaker C:** Okay. So what I understood is we need to first decide what, this can be one use case, basically data population. Yeah. Um, or data... data enrichment. Yeah. I guess um we can kind of figure out or like hack it with um, I don't know with uh kind of just having an agent that just kind of does a keyword searches on the database. Um kind of like through um I don't know it's called...

**Speaker C:** Semantic search?

**Speaker A:** I think you mean keyword because I would also say semantic...

**Speaker B:** It can be hybrid keyword plus...

**Speaker A:** I mentioned embedding the whole database of like all those companies in the US or so. Those are probably millions of companies.

**Speaker C:** Yeah it should be still be fast if we are...

**Speaker A:** Sorry?

**Speaker C:** You think it will it's reasonable to do? Because we also need to store those embeddings.

**Speaker B:** Yeah, it's fine. Like we are storing millions so it should be enough, like it should give results in few seconds. One or two.

**Speaker A:** I mean we could also start off with like just doing it in San Francisco or so or doing it in this county.

**Speaker B:** Yeah. Yeah, that would be fine. I think always to up the ante.

**Speaker A:** Yeah. Yeah. Probably hard, but let's see whether we can access that data.

**Speaker B:** Okay. I'm pretty sure in Germany you couldn't access that data. Probably pretty hard to find. Yeah. Um, okay, so data enrichments, um so we're doing a semantic search or like the keywords. Um yeah. It's a requirement, I guess.

**Speaker A:** I mean if you want something functional. Yeah. It's kind of getting there.

**Speaker C:** I think we are also a bit at the stage where we build three things actually. Uh, like I'm just confused about like how, how will be the interaction of a user with the platform? So like I, I'm not too much in sales so I just went out. So what I understood is it's something like a we are buying from an bigger enterprises. So what will be my flow? Like how we are uh like putting that into an agentic space? Like what what something else we are bringing than a normal like what I understood is like we are having bunch of databases of company and it's just something sitting which I'm asking question for my requirements and it's kind of giving me suggestions or also it's updating someone else that I'm a potential lead. Is that correct or there's something else that we are up to?

**Speaker A:** So the idea would be that the user chats through it with some Slack or so. And then the tool calls on the LLM decide what to do.

**Speaker B:** That I understood. He he does something to figure out to give me uh like a list of companies along with my specs that I'm asking about. Exactly. That answers it. But what I'm thinking is uh it's still easily be done today as well with web search. So might not be that complex.

**Speaker A:** There's yeah it can be done a lot with web search but it also populates the table and decides when to...

**Speaker B:** Okay we can have this ecosystem to be built for an enterprises to identify leads. Well also we want to have a uniform presentation of the data so it'd probably be, like a web search probably wouldn't be the most optimal for that since you kind of have to like parse through like natural language, different marketing what nots and all that. Whereas if you use a database it's kind of all in like a uniform presentation. It's kind of reduces the complexity of these uh of these uh operations.

**Speaker C:** I guess like maybe there are two things or one thing we need to decide. One is do we want to have a mini or like a co-pilot or helper, an intern that does little tasks such as, "Hey, for this lead, I just talked with it and note down they are not interested." And then it populates the table from the information I get and there's some smaller web search things and so on, but like smaller tools. Or we do something more complicated which is for example looking through all the um so doing a semantic or keyword search and so on and finding similar companies or leads and sourcing. So it's called sourcing basically. And this would be something completely different because it's one bigger project. So do we want to have like a small... something that can do many things and we have a cool chat interface and um we can just like talk to it and so on. Or do we want to have one thing where we have a front end and we put in I don't know, a company name and it searches everything itself and like we have this one use case. I think those are three, four small use cases and the thing with semantic search given the time today is probably one bigger use case that we make great.

**Speaker B:** Okay. I think that's something we need to decide. Um, I guess for a hackathon it just, I mean in terms of like um our like ability to compete with like other teams. I guess like the in terms of like the presentability of the idea or like the value um... I mean I don't know, I've like kind of thought about this, but is it, I guess is it better to have something that's more niche for like a certain use case or kind of more broad for like multiple use cases? Um but that's less, less um good at each one.

**Speaker C:** Yeah, same. Yeah, not the same thoughts. And that's exactly what we need to decide.

**Speaker B:** Yeah. What are your opinions on it?

**Speaker C:** Having a niche would be good because we'll be able to show a value proposition by EOD because going broad will, I don't know, because I have failed in a lot of hackathons by going broad because it it takes time sometimes, so we are not able to show the value proposition at end. So having a...

**Speaker A:** Yeah, maybe let's go niche because in the end when we go broad, and we build this, this can be ChatGPT connected to Zapier. Okay. Probably that's not so valuable. Yeah. Let's go niche.

**Speaker B:** Well then we can also kind of like expand upon in a niche if we have time. Yeah.

**Speaker C:** Okay.

**Speaker B:** So, so I guess what we're doing is the um, so like the flow, so we so we have the uh the chat interface, um I guess we just kind of use like a, I don't know, like a very basic front end or we just kind of like hack, yeah we can have the component interface, we can...

**Speaker A:** You don't even need a chat interface maybe. It would be nice if we had just a voice kind of thing. Yeah. Yeah, but I mean first of all we need to figure out what we build, right? What is the niche case and then we figure out how do we populate or how do we interact with it. Okay. Because maybe we just put in a company name and it searches like all similar ones or so. It can also work.

**Speaker B:** Okay. So we definitely need um a database or I guess we have to find, figure out like what the database looks like. Um we need the uh the back end logic that kind of um serves as the uh the interface between our chat interface and the database. Not a problem. Um yeah and that's basically, and then we just kind of figure out the API calls to the chat. That will be also fine. Yeah.

**Speaker C:** So what I understood is uh in our first milestone we can hit a client interacting with an application. Um according to requirements he get the list of companies. That's all, right? That's the end goal, right?

**Speaker B:** Yeah, yeah.

**Speaker C:** And it does also notifies the enterprises that are listed upon the database.

**Speaker B:** Okay.

**Speaker C:** It could be.

**Speaker A:** So it's basically a sourcing solution if we find other companies.

**Speaker B:** Yeah and then we can kind of build out like more agentic things, tools from there. Yeah.

**Speaker A:** Yeah, but so data enrichment, what not. Yeah.

**Speaker C:** Okay. So what I understood is we need to first decide what, this can be one use case, basically data population. Yeah. Um, or data... data enrichment. Yeah. I guess um we can kind of figure out or like hack it with um, I don't know with uh kind of just having an agent that just kind of does a keyword searches on the database. Um kind of like through um I don't know it's called...

**Speaker C:** Semantic search?

**Speaker A:** I think you mean keyword because I would also say semantic...

**Speaker B:** It can be hybrid keyword plus...

**Speaker A:** I mentioned embedding the whole database of like all those companies in the US or so. Those are probably millions of companies.

**Speaker C:** Yeah it should be still be fast if we are...

**Speaker A:** Sorry?

**Speaker C:** You think it will it's reasonable to do? Because we also need to store those embeddings.

**Speaker B:** Yeah, it's fine. Like we are storing millions so it should be enough, like it should give results in few seconds. One or two.

**Speaker A:** I mean we could also start off with like just doing it in San Francisco or so or doing it in this county.

**Speaker B:** Yeah. Yeah, that would be fine. I think always to up the ante.

**Speaker A:** Yeah. Yeah. Probably hard, but let's see whether we can access that data.

**Speaker B:** Okay. I'm pretty sure in Germany you couldn't access that data. Probably pretty hard to find. Yeah. Um, okay, so data enrichments, um so we're doing a semantic search or like the keywords. Um yeah. It's a requirement, I guess.

**Speaker A:** I mean if you want something functional. Yeah. It's kind of getting there.

**Speaker C:** I think we are also a bit at the stage where we build three things actually. Uh, like I'm just confused about like how, how will be the interaction of a user with the platform? So like I, I'm not too much in sales so I just went out. So what I understood is it's something like a we are buying from an bigger enterprises. So what will be my flow? Like how we are uh like putting that into an agentic space? Like what what something else we are bringing than a normal like what I understood is like we are having bunch of databases of company and it's just something sitting which I'm asking question for my requirements and it's kind of giving me suggestions or also it's updating someone else that I'm a potential lead. Is that correct or there's something else that we are up to?

**Speaker A:** So the idea would be that the user chats through it with some Slack or so. And then the tool calls on the LLM decide what to do.

**Speaker B:** That I understood. He he does something to figure out to give me uh like a list of companies along with my specs that I'm asking about. Exactly. That answers it. But what I'm thinking is uh it's still easily be done today as well with web search. So might not be that complex.

**Speaker A:** There's yeah it can be done a lot with web search but it also populates the table and decides when to...

**Speaker B:** Okay we can have this ecosystem to be built for an enterprises to identify leads. Well also we want to have a uniform presentation of the data so it'd probably be, like a web search probably wouldn't be the most optimal for that since you kind of have to like parse through like natural language, different marketing what nots and all that. Whereas if you use a database it's kind of all in like a uniform presentation. It's kind of reduces the complexity of these uh of these uh operations.

**Speaker C:** I guess like maybe there are two things or one thing we need to decide. One is do we want to have a mini or like a co-pilot or helper, an intern that does little tasks such as, "Hey, for this lead, I just talked with it and note down they are not interested." And then it populates the table from the information I get and there's some smaller web search things and so on, but like smaller tools. Or we do something more complicated which is for example looking through all the um so doing a semantic or keyword search and so on and finding similar companies or leads and sourcing. So it's called sourcing basically. And this would be something completely different because it's one bigger project. So do we want to have like a small... something that can do many things and we have a cool chat interface and um we can just like talk to it and so on. Or do we want to have one thing where we have a front end and we put in I don't know, a company name and it searches everything itself and like we have this one use case. I think those are three, four small use cases and the thing with semantic search given the time today is probably one bigger use case that we make great.

**Speaker B:** Okay. I think that's something we need to decide. Um, I guess for a hackathon it just, I mean in terms of like um our like ability to compete with like other teams. I guess like the in terms of like the presentability of the idea or like the value um... I mean I don't know, I've like kind of thought about this, but is it, I guess is it better to have something that's more niche for like a certain use case or kind of more broad for like multiple use cases? Um but that's less, less um good at each one.

**Speaker C:** Yeah, same. Yeah, not the same thoughts. And that's exactly what we need to decide.

**Speaker B:** Yeah. What are your opinions on it?

**Speaker C:** Having a niche would be good because we'll be able to show a value proposition by EOD because going broad will, I don't know, because I have failed in a lot of hackathons by going broad because it it takes time sometimes, so we are not able to show the value proposition at end. So having a...

**Speaker A:** Yeah, maybe let's go niche because in the end when we go broad, and we build this, this can be ChatGPT connected to Zapier. Okay. Probably that's not so valuable. Yeah. Let's go niche.

**Speaker B:** Well then we can also kind of like expand upon in a niche if we have time. Yeah.

**Speaker C:** Okay.

**Speaker B:** So, so I guess what we're doing is the um, so like the flow, so we so we have the uh the chat interface, um I guess we just kind of use like a, I don't know, like a very basic front end or we just kind of like hack, yeah we can have the component interface, we can...

**Speaker A:** You don't even need a chat interface maybe. It would be nice if we had just a voice kind of thing. Yeah. Yeah, but I mean first of all we need to figure out what we build, right? What is the niche case and then we figure out how do we populate or how do we interact with it. Okay. Because maybe we just put in a company name and it searches like all similar ones or so. It can also work.

**Speaker B:** Okay. So we definitely need um a database or I guess we have to find, figure out like what the database looks like. Um we need the uh the back end logic that kind of um serves as the uh the interface between our chat interface and the database. Not a problem. Um yeah and that's basically, and then we just kind of figure out the API calls to the chat. That will be also fine. Yeah.

**Speaker C:** So what I understood is uh in our first milestone we can hit a client interacting with an application. Um according to requirements he get the list of companies. That's all, right? That's the end goal, right?

**Speaker B:** Yeah, yeah.

**Speaker C:** And it does also notifies the enterprises that are listed upon the database.

**Speaker B:** Okay.

**Speaker C:** It could be.

**Speaker A:** So it's basically a sourcing solution if we find other companies.

**Speaker B:** Yeah and then we can kind of build out like more agentic things, tools from there. Yeah.

**Speaker A:** Yeah, but so data enrichment, what not. Yeah.

**Speaker C:** Okay. So what I understood is we need to first decide what, this can be one use case, basically data population. Yeah. Um, or data... data enrichment. Yeah. I guess um we can kind of figure out or like hack it with um, I don't know with uh kind of just having an agent that just kind of does a keyword searches on the database. Um kind of like through um I don't know it's called...

**Speaker C:** Semantic search?

**Speaker A:** I think you mean keyword because I would also say semantic...

**Speaker B:** It can be hybrid keyword plus...

**Speaker A:** I mentioned embedding the whole database of like all those companies in the US or so. Those are probably millions of companies.

**Speaker C:** Yeah it should be still be fast if we are...

**Speaker A:** Sorry?

**Speaker C:** You think it will it's reasonable to do? Because we also need to store those embeddings.

**Speaker B:** Yeah, it's fine. Like we are storing millions so it should be enough, like it should give results in few seconds. One or two.

**Speaker A:** I mean we could also start off with like just doing it in San Francisco or so or doing it in this county.

**Speaker B:** Yeah. Yeah, that would be fine. I think always to up the ante.

**Speaker A:** Yeah. Yeah. Probably hard, but let's see whether we can access that data.

**Speaker B:** Okay. I'm pretty sure in Germany you couldn't access that data. Probably pretty hard to find. Yeah. Um, okay, so data enrichments, um so we're doing a semantic search or like the keywords. Um yeah. It's a requirement, I guess.

**Speaker A:** I mean if you want something functional. Yeah. It's kind of getting there.

**Speaker C:** I think we are also a bit at the stage where we build three things actually. Uh, like I'm just confused about like how, how will be the interaction of a user with the platform? So like I, I'm not too much in sales so I just went out. So what I understood is it's something like a we are buying from an bigger enterprises. So what will be my flow? Like how we are uh like putting that into an agentic space? Like what what something else we are bringing than a normal like what I understood is like we are having bunch of databases of company and it's just something sitting which I'm asking question for my requirements and it's kind of giving me suggestions or also it's updating someone else that I'm a potential lead. Is that correct or there's something else that we are up to?

**Speaker A:** So the idea would be that the user chats through it with some Slack or so. And then the tool calls on the LLM decide what to do.

**Speaker B:** That I understood. He he does something to figure out to give me uh like a list of companies along with my specs that I'm asking about. Exactly. That answers it. But what I'm thinking is uh it's still easily be done today as well with web search. So might not be that complex.

**Speaker A:** There's yeah it can be done a lot with web search but it also populates the table and decides when to...

**Speaker B:** Okay we can have this ecosystem to be built for an enterprises to identify leads. Well also we want to have a uniform presentation of the data so it'd probably be, like a web search probably wouldn't be the most optimal for that since you kind of have to like parse through like natural language, different marketing what nots and all that. Whereas if you use a database it's kind of all in like a uniform presentation. It's kind of reduces the complexity of these uh of these uh operations.

**Speaker C:** I guess like maybe there are two things or one thing we need to decide. One is do we want to have a mini or like a co-pilot or helper, an intern that does little tasks such as, "Hey, for this lead, I just talked with it and note down they are not interested." And then it populates the table from the information I get and there's some smaller web search things and so on, but like smaller tools. Or we do something more complicated which is for example looking through all the um so doing a semantic or keyword search and so on and finding similar companies or leads and sourcing. So it's called sourcing basically. And this would be something completely different because it's one bigger project. So do we want to have like a small... something that can do many things and we have a cool chat interface and um we can just like talk to it and so on. Or do we want to have one thing where we have a front end and we put in I don't know, a company name and it searches everything itself and like we have this one use case. I think those are three, four small use cases and the thing with semantic search given the time today is probably one bigger use case that we make great.

**Speaker B:** Okay. I think that's something we need to decide. Um, I guess for a hackathon it just, I mean in terms of like um our like ability to compete with like other teams. I guess like the in terms of like the presentability of the idea or like the value um... I mean I don't know, I've like kind of thought about this, but is it, I guess is it better to have something that's more niche for like a certain use case or kind of more broad for like multiple use cases? Um but that's less, less um good at each one.

**Speaker C:** Yeah, same. Yeah, not the same thoughts. And that's exactly what we need to decide.

**Speaker B:** Yeah. What are your opinions on it?

**Speaker C:** Having a niche would be good because we'll be able to show a value proposition by EOD because going broad will, I don't know, because I have failed in a lot of hackathons by going broad because it it takes time sometimes, so we are not able to show the value proposition at end. So having a...

**Speaker A:** Yeah, maybe let's go niche because in the end when we go broad, and we build this, this can be ChatGPT connected to Zapier. Okay. Probably that's not so valuable. Yeah. Let's go niche.

**Speaker B:** Well then we can also kind of like expand upon in a niche if we have time. Yeah.

**Speaker C:** Okay.

**Speaker B:** So, so I guess what we're doing is the um, so like the flow, so we so we have the uh the chat interface, um I guess we just kind of use like a, I don't know, like a very basic front end or we just kind of like hack, yeah we can have the component interface, we can...

**Speaker A:** You don't even need a chat interface maybe. It would be nice if we had just a voice kind of thing. Yeah. Yeah, but I mean first of all we need to figure out what we build, right? What is the niche case and then we figure out how do we populate or how do we interact with it. Okay. Because maybe we just put in a company name and it searches like all similar ones or so. It can also work.

**Speaker B:** Okay. So we definitely need um a database or I guess we have to find, figure out like what the database looks like. Um we need the uh the back end logic that kind of um serves as the uh the interface between our chat interface and the database. Not a problem. Um yeah and that's basically, and then we just kind of figure out the API calls to the chat. That will be also fine. Yeah.

**Speaker C:** So what I understood is uh in our first milestone we can hit a client interacting with an application. Um according to requirements he get the list of companies. That's all, right? That's the end goal, right?

**Speaker B:** Yeah, yeah.

**Speaker C:** And it does also notifies the enterprises that are listed upon the database.

**Speaker B:** Okay.

**Speaker C:** It could be.

**Speaker A:** So it's basically a sourcing solution if we find other companies.

**Speaker B:** Yeah and then we can kind of build out like more agentic things, tools from there. Yeah.

**Speaker A:** Yeah, but so data enrichment, what not. Yeah.

**Speaker C:** Okay. So what I understood is we need to first decide what, this can be one use case, basically data population. Yeah. Um, or data... data enrichment. Yeah. I guess um we can kind of figure out or like hack it with um, I don't know with uh kind of just having an agent that just kind of does a keyword searches on the database. Um kind of like through um I don't know it's called...

**Speaker C:** Semantic search?

**Speaker A:** I think you mean keyword because I would also say semantic...

**Speaker B:** It can be hybrid keyword plus...

**Speaker A:** I mentioned embedding the whole database of like all those companies in the US or so. Those are probably millions of companies.

**Speaker C:** Yeah it should be still be fast if we are...

**Speaker A:** Sorry?

**Speaker C:** You think it will it's reasonable to do? Because we also need to store those embeddings.

**Speaker B:** Yeah, it's fine. Like we are storing millions so it should be enough, like it should give results in few seconds. One or two.

**Speaker A:** I mean we could also start off with like just doing it in San Francisco or so or doing it in this county.

**Speaker B:** Yeah. Yeah, that would be fine. I think always to up the ante.

**Speaker A:** Yeah. Yeah. Probably hard, but let's see whether we can access that data.

**Speaker B:** Okay. I'm pretty sure in Germany you couldn't access that data. Probably pretty hard to find. Yeah. Um, okay, so data enrichments, um so we're doing a semantic search or like the keywords. Um yeah. It's a requirement, I guess.

**Speaker A:** I mean if you want something functional. Yeah. It's kind of getting there.

**Speaker C:** I think we are also a bit at the stage where we build three things actually. Uh, like I'm just confused about like how, how will be the interaction of a user with the platform? So like I, I'm not too much in sales so I just went out. So what I understood is it's something like a we are buying from an bigger enterprises. So what will be my flow? Like how we are uh like putting that into an agentic space? Like what what something else we are bringing than a normal like what I understood is like we are having bunch of databases of company and it's just something sitting which I'm asking question for my requirements and it's kind of giving me suggestions or also it's updating someone else that I'm a potential lead. Is that correct or there's something else that we are up to?

**Speaker A:** So the idea would be that the user chats through it with some Slack or so. And then the tool calls on the LLM decide what to do.

**Speaker B:** That I understood. He he does something to figure out to give me uh like a list of companies along with my specs that I'm asking about. Exactly. That answers it. But what I'm thinking is uh it's still easily be done today as well with web search. So might not be that complex.

**Speaker A:** There's yeah it can be done a lot with web search but it also populates the table and decides when to...

**Speaker B:** Okay we can have this ecosystem to be built for an enterprises to identify leads. Well also we want to have a uniform presentation of the data so it'd probably be, like a web search probably wouldn't be the most optimal for that since you kind of have to like parse through like natural language, different marketing what nots and all that. Whereas if you use a database it's kind of all in like a uniform presentation. It's kind of reduces the complexity of these uh of these uh operations.

**Speaker C:** I guess like maybe there are two things or one thing we need to decide. One is do we want to have a mini or like a co-pilot or helper, an intern that does little tasks such as, "Hey, for this lead, I just talked with it and note down they are not interested." And then it populates the table from the information I get and there's some smaller web search things and so on, but like smaller tools. Or we do something more complicated which is for example looking through all the um so doing a semantic or keyword search and so on and finding similar companies or leads and sourcing. So it's called sourcing basically. And this would be something completely different because it's one bigger project. So do we want to have like a small... something that can do many things and we have a cool chat interface and um we can just like talk to it and so on. Or do we want to have one thing where we have a front end and we put in I don't know, a company name and it searches everything itself and like we have this one use case. I think those are three, four small use cases and the thing with semantic search given the time today is probably one bigger use case that we make great.

**Speaker B:** Okay. I think that's something we need to decide. Um, I guess for a hackathon it just, I mean in terms of like um our like ability to compete with like other teams. I guess like the in terms of like the presentability of the idea or like the value um... I mean I don't know, I've like kind of thought about this, but is it, I guess is it better to have something that's more niche for like a certain use case or kind of more broad for like multiple use cases? Um but that's less, less um good at each one.

**Speaker C:** Yeah, same. Yeah, not the same thoughts. And that's exactly what we need to decide.

**Speaker B:** Yeah. What are your opinions on it?

**Speaker C:** Having a niche would be good because we'll be able to show a value proposition by EOD because going broad will, I don't know, because I have failed in a lot of hackathons by going broad because it it takes time sometimes, so we are not able to show the value proposition at end. So having a...

**Speaker A:** Yeah, maybe let's go niche because in the end when we go broad, and we build this, this can be ChatGPT connected to Zapier. Okay. Probably that's not so valuable. Yeah. Let's go niche.

**Speaker B:** Well then we can also kind of like expand upon in a niche if we have time. Yeah.

**Speaker C:** Okay.

**Speaker B:** So, so I guess what we're doing is the um, so like the flow, so we so we have the uh the chat interface, um I guess we just kind of use like a, I don't know, like a very basic front end or we just kind of like hack, yeah we can have the component interface, we can...

**Speaker A:** You don't even need a chat interface maybe. It would be nice if we had just a voice kind of thing. Yeah. Yeah, but I mean first of all we need to figure out what we build, right? What is the niche case and then we figure out how do we populate or how do we interact with it. Okay. Because maybe we just put in a company name and it searches like all similar ones or so. It can also work.

**Speaker B:** Okay. So we definitely need um a database or I guess we have to find, figure out like what the database looks like. Um we need the uh the back end logic that kind of um serves as the uh the interface between our chat interface and the database. Not a problem. Um yeah and that's basically, and then we just kind of figure out the API calls to the chat. That will be also fine. Yeah.

**Speaker C:** So what I understood is uh in our first milestone we can hit a client interacting with an application. Um according to requirements he get the list of companies. That's all, right? That's the end goal, right?

**Speaker B:** Yeah, yeah.

**Speaker C:** And it does also notifies the enterprises that are listed upon the database.

**Speaker B:** Okay.

**Speaker C:** It could be.

**Speaker A:** So it's basically a sourcing solution if we find other companies.

**Speaker B:** Yeah and then we can kind of build out like more agentic things, tools from there. Yeah.

**Speaker A:** Yeah, but so data enrichment, what not. Yeah.

**Speaker C:** Okay. So what I understood is we need to first decide what, this can be one use case, basically data population. Yeah. Um, or data... data enrichment. Yeah. I guess um we can kind of figure out or like hack it with um, I don't know with uh kind of just having an agent that just kind of does a keyword searches on the database. Um kind of like through um I don't know it's called...

**Speaker C:** Semantic search?

**Speaker A:** I think you mean keyword because I would also say semantic...

**Speaker B:** It can be hybrid keyword plus...

**Speaker A:** I mentioned embedding the whole database of like all those companies in the US or so. Those are probably millions of companies.

**Speaker C:** Yeah it should be still be fast if we are...

**Speaker A:** Sorry?

**Speaker C:** You think it will it's reasonable to do? Because we also need to store those embeddings.

**Speaker B:** Yeah, it's fine. Like we are storing millions so it should be enough, like it should give results in few seconds. One or two.

**Speaker A:** I mean we could also start off with like just doing it in San Francisco or so or doing it in this county.

**Speaker B:** Yeah. Yeah, that would be fine. I think always to up the ante.

**Speaker A:** Yeah. Yeah. Probably hard, but let's see whether we can access that data.

**Speaker B:** Okay. I'm pretty sure in Germany you couldn't access that data. Probably pretty hard to find. Yeah. Um, okay, so data enrichments, um so we're doing a semantic search or like the keywords. Um yeah. It's a requirement, I guess.

**Speaker A:** I mean if you want something functional. Yeah. It's kind of getting there.

**Speaker C:** I think we are also a bit at the stage where we build three things actually. Uh, like I'm just confused about like how, how will be the interaction of a user with the platform? So like I, I'm not too much in sales so I just went out. So what I understood is it's something like a we are buying from an bigger enterprises. So what will be my flow? Like how we are uh like putting that into an agentic space? Like what what something else we are bringing than a normal like what I understood is like we are having bunch of databases of company and it's just something sitting which I'm asking question for my requirements and it's kind of giving me suggestions or also it's updating someone else that I'm a potential lead. Is that correct or there's something else that we are up to?

**Speaker A:** So the idea would be that the user chats through it with some Slack or so. And then the tool calls on the LLM decide what to do.

**Speaker B:** That I understood. He he does something to figure out to give me uh like a list of companies along with my specs that I'm asking about. Exactly. That answers it. But what I'm thinking is uh it's still easily be done today as well with web search. So might not be that complex.

**Speaker A:** There's yeah it can be done a lot with web search but it also populates the table and decides when to...

**Speaker B:** Okay we can have this ecosystem to be built for an enterprises to identify leads. Well also we want to have a uniform presentation of the data so it'd probably be, like a web search probably wouldn't be the most optimal for that since you kind of have to like parse through like natural language, different marketing what nots and all that. Whereas if you use a database it's kind of all in like a uniform presentation. It's kind of reduces the complexity of these uh of these uh operations.

**Speaker C:** I guess like maybe there are two things or one thing we need to decide. One is do we want to have a mini or like a co-pilot or helper, an intern that does little tasks such as, "Hey, for this lead, I just talked with it and note down they are not interested." And then it populates the table from the information I get and there's some smaller web search things and so on, but like smaller tools. Or we do something more complicated which is for example looking through all the um so doing a semantic or keyword search and so on and finding similar companies or leads and sourcing. So it's called sourcing basically. And this would be something completely different because it's one bigger project. So do we want to have like a small... something that can do many things and we have a cool chat interface and um we can just like talk to it and so on. Or do we want to have one thing where we have a front end and we put in I don't know, a company name and it searches everything itself and like we have this one use case. I think those are three, four small use cases and the thing with semantic search given the time today is probably one bigger use case that we make great.

**Speaker B:** Okay. I think that's something we need to decide. Um, I guess for a hackathon it just, I mean in terms of like um our like ability to compete with like other teams. I guess like the in terms of like the presentability of the idea or like the value um... I mean I don't know, I've like kind of thought about this, but is it, I guess is it better to have something that's more niche for like a certain use case or kind of more broad for like multiple use cases? Um but that's less, less um good at each one.

**Speaker C:** Yeah, same. Yeah, not the same thoughts. And that's exactly what we need to decide.

**Speaker B:** Yeah. What are your opinions on it?

**Speaker C:** Having a niche would be good because we'll be able to show a value proposition by EOD because going broad will, I don't know, because I have failed in a lot of hackathons by going broad because it it takes time sometimes, so we are not able to show the value proposition at end. So having a...

**Speaker A:** Yeah, maybe let's go niche because in the end when we go broad, and we build this, this can be ChatGPT connected to Zapier. Okay. Probably that's not so valuable. Yeah. Let's go niche.

**Speaker B:** Well then we can also kind of like expand upon in a niche if we have time. Yeah.

**Speaker C:** Okay.

**Speaker B:** So, so I guess what we're doing is the um, so like the flow, so we so we have the uh the chat interface, um I guess we just kind of use like a, I don't know, like a very basic front end or we just kind of like hack, yeah we can have the component interface, we can...

**Speaker A:** You don't even need a chat interface maybe. It would be nice if we had just a voice kind of thing. Yeah. Yeah, but I mean first of all we need to figure out what we build, right? What is the niche case and then we figure out how do we populate or how do we interact with it. Okay. Because maybe we just put in a company name and it searches like all similar ones or so. It can also work.

**Speaker B:** Okay. So we definitely need um a database or I guess we have to find, figure out like what the database looks like. Um we need the uh the back end logic that kind of um serves as the uh the interface between our chat interface and the database. Not a problem. Um yeah and that's basically, and then we just kind of figure out the API calls to the chat. That will be also fine. Yeah.

**Speaker C:** So what I understood is uh in our first milestone we can hit a client interacting with an application. Um according to requirements he get the list of companies. That's all, right? That's the end goal, right?

**Speaker B:** Yeah, yeah.

**Speaker C:** And it does also notifies the enterprises that are listed upon the database.

**Speaker B:** Okay.

**Speaker C:** It could be.

**Speaker A:** So it's basically a sourcing solution if we find other companies.

**Speaker B:** Yeah and then we can kind of build out like more agentic things, tools from there. Yeah.

**Speaker A:** Yeah, but so data enrichment, what not. Yeah.

**Speaker C:** Okay. So what I understood is we need to first decide what, this can be one use case, basically data population. Yeah. Um, or data... data enrichment. Yeah. I guess um we can kind of figure out or like hack it with um, I don't know with uh kind of just having an agent that just kind of does a keyword searches on the database. Um kind of like through um I don't know it's called...

**Speaker C:** Semantic search?

**Speaker A:** I think you mean keyword because I would also say semantic...

**Speaker B:** It can be hybrid keyword plus...

**Speaker A:** I mentioned embedding the whole database of like all those companies in the US or so. Those are probably millions of companies.

**Speaker C:** Yeah it should be still be fast if we are...

**Speaker A:** Sorry?

**Speaker C:** You think it will it's reasonable to do? Because we also need to store those embeddings.

**Speaker B:** Yeah, it's fine. Like we are storing millions so it should be enough, like it should give results in few seconds. One or two.

**Speaker A:** I mean we could also start off with like just doing it in San Francisco or so or doing it in this county.

**Speaker B:** Yeah. Yeah, that would be fine. I think always to up the ante.

**Speaker A:** Yeah. Yeah. Probably hard, but let's see whether we can access that data.

**Speaker B:** Okay. I'm pretty sure in Germany you couldn't access that data. Probably pretty hard to find. Yeah. Um, okay, so data enrichments, um so we're doing a semantic search or like the keywords. Um yeah. It's a requirement, I guess.

**Speaker A:** I mean if you want something functional. Yeah. It's kind of getting there.

**Speaker C:** I think we are also a bit at the stage where we build three things actually. Uh, like I'm just confused about like how, how will be the interaction of a user with the platform? So like I, I'm not too much in sales so I just went out. So what I understood is it's something like a we are buying from an bigger enterprises. So what will be my flow? Like how we are uh like putting that into an agentic space? Like what what something else we are bringing than a normal like what I understood is like we are having bunch of databases of company and it's just something sitting which I'm asking question for my requirements and it's kind of giving me suggestions or also it's updating someone else that I'm a potential lead. Is that correct or there's something else that we are up to?

**Speaker A:** So the idea would be that the user chats through it with some Slack or so. And then the tool calls on the LLM decide what to do.

**Speaker B:** That I understood. He he does something to figure out to give me uh like a list of companies along with my specs that I'm asking about. Exactly. That answers it. But what I'm thinking is uh it's still easily be done today as well with web search. So might not be that complex.

**Speaker A:** There's yeah it can be done a lot with web search but it also populates the table and decides when to...

**Speaker B:** Okay we can have this ecosystem to be built for an enterprises to identify leads. Well also we want to have a uniform presentation of the data so it'd probably be, like a web search probably wouldn't be the most optimal for that since you kind of have to like parse through like natural language, different marketing what nots and all that. Whereas if you use a database it's kind of all in like a uniform presentation. It's kind of reduces the complexity of these uh of these uh operations.

**Speaker C:** I guess like maybe there are two things or one thing we need to decide. One is do we want to have a mini or like a co-pilot or helper, an intern that does little tasks such as, "Hey, for this lead, I just talked with it and note down they are not interested." And then it populates the table from the information I get and there's some smaller web search things and so on, but like smaller tools. Or we do something more complicated which is for example looking through all the um so doing a semantic or keyword search and so on and finding similar companies or leads and sourcing. So it's called sourcing basically. And this would be something completely different because it's one bigger project. So do we want to have like a small... something that can do many things and we have a cool chat interface and um we can just like talk to it and so on. Or do we want to have one thing where we have a front end and we put in I don't know, a company name and it searches everything itself and like we have this one use case. I think those are three, four small use cases and the thing with semantic search given the time today is probably one bigger use case that we make great.

**Speaker B:** Okay. I think that's something we need to decide. Um, I guess for a hackathon it just, I mean in terms of like um our like ability to compete with like other teams. I guess like the in terms of like the presentability of the idea or like the value um... I mean I don't know, I've like kind of thought about this, but is it, I guess is it better to have something that's more niche for like a certain use case or kind of more broad for like multiple use cases? Um but that's less, less um good at each one.

**Speaker C:** Yeah, same. Yeah, not the same thoughts. And that's exactly what we need to decide.

**Speaker B:** Yeah. What are your opinions on it?

**Speaker C:** Having a niche would be good because we'll be able to show a value proposition by EOD because going broad will, I don't know, because I have failed in a lot of hackathons by going broad because it it takes time sometimes, so we are not able to show the value proposition at end. So having a...

**Speaker A:** Yeah, maybe let's go niche because in the end when we go broad, and we build this, this can be ChatGPT connected to Zapier. Okay. Probably that's not so valuable. Yeah. Let's go niche.

**Speaker B:** Well then we can also kind of like expand upon in a niche if we have time. Yeah.

**Speaker C:** Okay.

**Speaker B:** So, so I guess what we're doing is the um, so like the flow, so we so we have the uh the chat interface, um I guess we just kind of use like a, I don't know, like a very basic front end or we just kind of like hack, yeah we can have the component interface, we can...

**Speaker A:** You don't even need a chat interface maybe. It would be nice if we had just a voice kind of thing. Yeah. Yeah, but I mean first of all we need to figure out what we build, right? What is the niche case and then we figure out how do we populate or how do we interact with it. Okay. Because maybe we just put in a company name and it searches like all similar ones or so. It can also work.

**Speaker B:** Okay. So we definitely need um a database or I guess we have to find, figure out like what the database looks like. Um we need the uh the back end logic that kind of um serves as the uh the interface between our chat interface and the database. Not a problem. Um yeah and that's basically, and then we just kind of figure out the API calls to the chat. That will be also fine. Yeah.

**Speaker C:** So what I understood is uh in our first milestone we can hit a client interacting with an application. Um according to requirements he get the list of companies. That's all, right? That's the end goal, right?

**Speaker B:** Yeah, yeah.

**Speaker C:** And it does also notifies the enterprises that are listed upon the database.

**Speaker B:** Okay.

**Speaker C:** It could be.

**Speaker A:** So it's basically a sourcing solution if we find other companies.

**Speaker B:** Yeah and then we can kind of build out like more agentic things, tools from there. Yeah.

**Speaker A:** Yeah, but so data enrichment, what not. Yeah.

**Speaker C:** Okay. So what I understood is we need to first decide what, this can be one use case, basically data population. Yeah. Um, or data... data enrichment. Yeah. I guess um we can kind of figure out or like hack it with um, I don't know with uh kind of just having an agent that just kind of does a keyword searches on the database. Um kind of like through um I don't know it's called...

**Speaker C:** Semantic search?

**Speaker A:** I think you mean keyword because I would also say semantic...

**Speaker B:** It can be hybrid keyword plus...

**Speaker A:** I mentioned embedding the whole database of like all those companies in the US or so. Those are probably millions of companies.

**Speaker C:** Yeah it should be still be fast if we are...

**Speaker A:** Sorry?

**Speaker C:** You think it will it's reasonable to do? Because we also need to store those embeddings.

**Speaker B:** Yeah, it's fine. Like we are storing millions so it should be enough, like it should give results in few seconds. One or two.

**Speaker A:** I mean we could also start off with like just doing it in San Francisco or so or doing it in this county.

**Speaker B:** Yeah. Yeah, that would be fine. I think always to up the ante.

**Speaker A:** Yeah. Yeah. Probably hard, but let's see whether we can access that data.

**Speaker B:** Okay. I'm pretty sure in Germany you couldn't access that data. Probably pretty hard to find. Yeah. Um, okay, so data enrichments, um so we're doing a semantic search or like the keywords. Um yeah. It's a requirement, I guess.

**Speaker A:** I mean if you want something functional. Yeah. It's kind of getting there.

**Speaker C:** I think we are also a bit at the stage where we build three things actually. Uh, like I'm just confused about like how, how will be the interaction of a user with the platform? So like I, I'm not too much in sales so I just went out. So what I understood is it's something like a we are buying from an bigger enterprises. So what will be my flow? Like how we are uh like putting that into an agentic space? Like what what something else we are bringing than a normal like what I understood is like we are having bunch of databases of company and it's just something sitting which I'm asking question for my requirements and it's kind of giving me suggestions or also it's updating someone else that I'm a potential lead. Is that correct or there's something else that we are up to?

**Speaker A:** So the idea would be that the user chats through it with some Slack or so. And then the tool calls on the LLM decide what to do.

**Speaker B:** That I understood. He he does something to figure out to give me uh like a list of companies along with my specs that I'm asking about. Exactly. That answers it. But what I'm thinking is uh it's still easily be done today as well with web search. So might not be that complex.

**Speaker A:** There's yeah it can be done a lot with web search but it also populates the table and decides when to...

**Speaker B:** Okay we can have this ecosystem to be built for an enterprises to identify leads. Well also we want to have a uniform presentation of the data so it'd probably be, like a web search probably wouldn't be the most optimal for that since you kind of have to like parse through like natural language, different marketing what nots and all that. Whereas if you use a database it's kind of all in like a uniform presentation. It's kind of reduces the complexity of these uh of these uh operations.

**Speaker C:** I guess like maybe there are two things or one thing we need to decide. One is do we want to have a mini or like a co-pilot or helper, an intern that does little tasks such as, "Hey, for this lead, I just talked with it and note down they are not interested." And then it populates the table from the information I get and there's some smaller web search things and so on, but like smaller tools. Or we do something more complicated which is for example looking through all the um so doing a semantic or keyword search and so on and finding similar companies or leads and sourcing. So it's called sourcing basically. And this would be something completely different because it's one bigger project. So do we want to have like a small... something that can do many things and we have a cool chat interface and um we can just like talk to it and so on. Or do we want to have one thing where we have a front end and we put in I don't know, a company name and it searches everything itself and like we have this one use case. I think those are three, four small use cases and the thing with semantic search given the time today is probably one bigger use case that we make great.

**Speaker B:** Okay. I think that's something we need to decide. Um, I guess for a hackathon it just, I mean in terms of like um our like ability to compete with like other teams. I guess like the in terms of like the presentability of the idea or like the value um... I mean I don't know, I've like kind of thought about this, but is it, I guess is it better to have something that's more niche for like a certain use case or kind of more broad for like multiple use cases? Um but that's less, less um good at each one.

**Speaker C:** Yeah, same. Yeah, not the same thoughts. And that's exactly what we need to decide.

**Speaker B:** Yeah. What are your opinions on it?

**Speaker C:** Having a niche would be good because we'll be able to show a value proposition by EOD because going broad will, I don't know, because I have failed in a lot of hackathons by going broad because it it takes time sometimes, so we are not able to show the value proposition at end. So having a...

**Speaker A:** Yeah, maybe let's go niche because in the end when we go broad, and we build this, this can be ChatGPT connected to Zapier. Okay. Probably that's not so valuable. Yeah. Let's go niche.

**Speaker B:** Well then we can also kind of like expand upon in a niche if we have time. Yeah.

**Speaker C:** Okay.

**Speaker B:** So, so I guess what we're doing is the um, so like the flow, so we so we have the uh the chat interface, um I guess we just kind of use like a, I don't know, like a very basic front end or we just kind of like hack, yeah we can have the component interface, we can...

**Speaker A:** You don't even need a chat interface maybe. It would be nice if we had just a voice kind of thing. Yeah. Yeah, but I mean first of all we need to figure out what we build, right? What is the niche case and then we figure out how do we populate or how do we interact with it. Okay. Because maybe we just put in a company name and it searches like all similar ones or so. It can also work.

**Speaker B:** Okay. So we definitely need um a database or I guess we have to find, figure out like what the database looks like. Um we need the uh the back end logic that kind of um serves as the uh the interface between our chat interface and the database. Not a problem. Um yeah and that's basically, and then we just kind of figure out the API calls to the chat. That will be also fine. Yeah.

**Speaker C:** So what I understood is uh in our first milestone we can hit a client interacting with an application. Um according to requirements he get the list of companies. That's all, right? That's the end goal, right?

**Speaker B:** Yeah, yeah.

**Speaker C:** And it does also notifies the enterprises that are listed upon the database.

**Speaker B:** Okay.

**Speaker C:** It could be.

**Speaker A:** So it's basically a sourcing solution if we find other companies.

**Speaker B:** Yeah and then we can kind of build out like more agentic things, tools from there. Yeah.

**Speaker A:** Yeah, but so data enrichment, what not. Yeah.

**Speaker C:** Okay. So what I understood is we need to first decide what, this can be one use case, basically data population. Yeah. Um, or data... data enrichment. Yeah. I guess um we can kind of figure out or like hack it with um, I don't know with uh kind of just having an agent that just kind of does a keyword searches on the database. Um kind of like through um I don't know it's called...

**Speaker C:** Semantic search?

**Speaker A:** I think you mean keyword because I would also say semantic...

**Speaker B:** It can be hybrid keyword plus...

**Speaker A:** I mentioned embedding the whole database of like all those companies in the US or so. Those are probably millions of companies.

**Speaker C:** Yeah it should be still be fast if we are...

**Speaker A:** Sorry?

**Speaker C:** You think it will it's reasonable to do? Because we also need to store those embeddings.

**Speaker B:** Yeah, it's fine. Like we are storing millions so it should be enough, like it should give results in few seconds. One or two.

**Speaker A:** I mean we could also start off with like just doing it in San Francisco or so or doing it in this county.

**Speaker B:** Yeah. Yeah, that would be fine. I think always to up the ante.

**Speaker A:** Yeah. Yeah. Probably hard, but let's see whether we can access that data.

**Speaker B:** Okay. I'm pretty sure in Germany you couldn't access that data. Probably pretty hard to find. Yeah. Um, okay, so data enrichments, um so we're doing a semantic search or like the keywords. Um yeah. It's a requirement, I guess.

**Speaker A:** I mean if you want something functional. Yeah. It's kind of getting there.

**Speaker C:** I think we are also a bit at the stage where we build three things actually. Uh, like I'm just confused about like how, how will be the interaction of a user with the platform? So like I, I'm not too much in sales so I just went out. So what I understood is it's something like a we are buying from an bigger enterprises. So what will be my flow? Like how we are uh like putting that into an agentic space? Like what what something else we are bringing than a normal like what I understood is like we are having bunch of databases of company and it's just something sitting which I'm asking question for my requirements and it's kind of giving me suggestions or also it's updating someone else that I'm a potential lead. Is that correct or there's something else that we are up to?

**Speaker A:** So the idea would be that the user chats through it with some Slack or so. And then the tool calls on the LLM decide what to do.

**Speaker B:** That I understood. He he does something to figure out to give me uh like a list of companies along with my specs that I'm asking about. Exactly. That answers it. But what I'm thinking is uh it's still easily be done today as well with web search. So might not be that complex.

**Speaker A:** There's yeah it can be done a lot with web search but it also populates the table and decides when to...

**Speaker B:** Okay we can have this ecosystem to be built for an enterprises to identify leads. Well also we want to have a uniform presentation of the data so it'd probably be, like a web search probably wouldn't be the most optimal for that since you kind of have to like parse through like natural language, different marketing what nots and all that. Whereas if you use a database it's kind of all in like a uniform presentation. It's kind of reduces the complexity of these uh of these uh operations.

**Speaker C:** I guess like maybe there are two things or one thing we need to decide. One is do we want to have a mini or like a co-pilot or helper, an intern that does little tasks such as, "Hey, for this lead, I just talked with it and note down they are not interested." And then it populates the table from the information I get and there's some smaller web search things and so on, but like smaller tools. Or we do something more complicated which is for example looking through all the um so doing a semantic or keyword search and so on and finding similar companies or leads and sourcing. So it's called sourcing basically. And this would be something completely different because it's one bigger project. So do we want to have like a small... something that can do many things and we have a cool chat interface and um we can just like talk to it and so on. Or do we want to have one thing where we have a front end and we put in I don't know, a company name and it searches everything itself and like we have this one use case. I think those are three, four small use cases and the thing with semantic search given the time today is probably one bigger use case that we make great.

**Speaker B:** Okay. I think that's something we need to decide. Um, I guess for a hackathon it just, I mean in terms of like um our like ability to compete with like other teams. I guess like the in terms of like the presentability of the idea or like the value um... I mean I don't know, I've like kind of thought about this, but is it, I guess is it better to have something that's more niche for like a certain use case or kind of more broad for like multiple use cases? Um but that's less, less um good at each one.

**Speaker C:** Yeah, same. Yeah, not the same thoughts. And that's exactly what we need to decide.

**Speaker B:** Yeah. What are your opinions on it?

**Speaker C:** Having a niche would be good because we'll be able to show a value proposition by EOD because going broad will, I don't know, because I have failed in a lot of hackathons by going broad because it it takes time sometimes, so we are not able to show the value proposition at end. So having a...

**Speaker A:** Yeah, maybe let's go niche because in the end when we go broad, and we build this, this can be ChatGPT connected to Zapier. Okay. Probably that's not so valuable. Yeah. Let's go niche.

**Speaker B:** Well then we can also kind of like expand upon in a niche if we have time. Yeah.

**Speaker C:** Okay.

**Speaker B:** So, so I guess what we're doing is the um, so like the flow, so we so we have the uh the chat interface, um I guess we just kind of use like a, I don't know, like a very basic front end or we just kind of like hack, yeah we can have the component interface, we can...

**Speaker A:** You don't even need a chat interface maybe. It would be nice if we had just a voice kind of thing. Yeah. Yeah, but I mean first of all we need to figure out what we build, right? What is the niche case and then we figure out how do we populate or how do we interact with it. Okay. Because maybe we just put in a company name and it searches like all similar ones or so. It can also work.

**Speaker B:** Okay. So we definitely need um a database or I guess we have to find, figure out like what the database looks like. Um we need the uh the back end logic that kind of um serves as the uh the interface between our chat interface and the database. Not a problem. Um yeah and that's basically, and then we just kind of figure out the API calls to the chat. That will be also fine. Yeah.

**Speaker C:** So what I understood is uh in our first milestone we can hit a client interacting with an application. Um according to requirements he get the list of companies. That's all, right? That's the end goal, right?

**Speaker B:** Yeah, yeah.

**Speaker C:** And it does also notifies the enterprises that are listed upon the database.

**Speaker B:** Okay.

**Speaker C:** It could be.

**Speaker A:** So it's basically a sourcing solution if we find other companies.

**Speaker B:** Yeah and then we can kind of build out like more agentic things, tools from there. Yeah.

**Speaker A:** Yeah, but so data enrichment, what not. Yeah.

**Speaker C:** Okay. So what I understood is we need to first decide what, this can be one use case, basically data population. Yeah. Um, or data... data enrichment. Yeah. I guess um we can kind of figure out or like hack it with um, I don't know with uh kind of just having an agent that just kind of does a keyword searches on the database. Um kind of like through um I don't know it's called...

**Speaker C:** Semantic search?

**Speaker A:** I think you mean keyword because I would also say semantic...

**Speaker B:** It can be hybrid keyword plus...

**Speaker A:** I mentioned embedding the whole database of like all those companies in the US or so. Those are probably millions of companies.

**Speaker C:** Yeah it should be still be fast if we are...

**Speaker A:** Sorry?

**Speaker C:** You think it will it's reasonable to do? Because we also need to store those embeddings.

**Speaker B:** Yeah, it's fine. Like we are storing millions so it should be enough, like it should give results in few seconds. One or two.

**Speaker A:** I mean we could also start off with like just doing it in San Francisco or so or doing it in this county.

**Speaker B:** Yeah. Yeah, that would be fine. I think always to up the ante.

**Speaker A:** Yeah. Yeah. Probably hard, but let's see whether we can access that data.

**Speaker B:** Okay. I'm pretty sure in Germany you couldn't access that data. Probably pretty hard to find. Yeah. Um, okay, so data enrichments, um so we're doing a semantic search or like the keywords. Um yeah. It's a requirement, I guess.

**Speaker A:** I mean if you want something functional. Yeah. It's kind of getting there.

**Speaker C:** I think we are also a bit at the stage where we build three things actually. Uh, like I'm just confused about like how, how will be the interaction of a user with the platform? So like I, I'm not too much in sales so I just went out. So what I understood is it's something like a we are buying from an bigger enterprises. So what will be my flow? Like how we are uh like putting that into an agentic space? Like what what something else we are bringing than a normal like what I understood is like we are having bunch of databases of company and it's just something sitting which I'm asking question for my requirements and it's kind of giving me suggestions or also it's updating someone else that I'm a potential lead. Is that correct or there's something else that we are up to?

**Speaker A:** So the idea would be that the user chats through it with some Slack or so. And then the tool calls on the LLM decide what to do.

**Speaker B:** That I understood. He he does something to figure out to give me uh like a list of companies along with my specs that I'm asking about. Exactly. That answers it. But what I'm thinking is uh it's still easily be done today as well with web search. So might not be that complex.

**Speaker A:** There's yeah it can be done a lot with web search but it also populates the table and decides when to...

**Speaker B:** Okay we can have this ecosystem to be built for an enterprises to identify leads. Well also we want to have a uniform presentation of the data so it'd probably be, like a web search probably wouldn't be the most optimal for that since you kind of have to like parse through like natural language, different marketing what nots and all that. Whereas if you use a database it's kind of all in like a uniform presentation. It's kind of reduces the complexity of these uh of these uh operations.

**Speaker C:** I guess like maybe there are two things or one thing we need to decide. One is do we want to have a mini or like a co-pilot or helper, an intern that does little tasks such as, "Hey, for this lead, I just talked with it and note down they are not interested." And then it populates the table from the information I get and there's some smaller web search things and so on, but like smaller tools. Or we do something more complicated which is for example looking through all the um so doing a semantic or keyword search and so on and finding similar companies or leads and sourcing. So it's called sourcing basically. And this would be something completely different because it's one bigger project. So do we want to have like a small... something that can do many things and we have a cool chat interface and um we can just like talk to it and so on. Or do we want to have one thing where we have a front end and we put in I don't know, a company name and it searches everything itself and like we have this one use case. I think those are three, four small use cases and the thing with semantic search given the time today is probably one bigger use case that we make great.

**Speaker B:** Okay. I think that's something we need to decide. Um, I guess for a hackathon it just, I mean in terms of like um our like ability to compete with like other teams. I guess like the in terms of like the presentability of the idea or like the value um... I mean I don't know, I've like kind of thought about this, but is it, I guess is it better to have something that's more niche for like a certain use case or kind of more broad for like multiple use cases? Um but that's less, less um good at each one.

**Speaker C:** Yeah, same. Yeah, not the same thoughts. And that's exactly what we need to decide.

**Speaker B:** Yeah. What are your opinions on it?

**Speaker C:** Having a niche would be good because we'll be able to show a value proposition by EOD because going broad will, I don't know, because I have failed in a lot of hackathons by going broad because it it takes time sometimes, so we are not able to show the value proposition at end. So having a...

**Speaker A:** Yeah, maybe let's go niche because in the end when we go broad, and we build this, this can be ChatGPT connected to Zapier. Okay. Probably that's not so valuable. Yeah. Let's go niche.

**Speaker B:** Well then we can also kind of like expand upon in a niche if we have time. Yeah.

**Speaker C:** Okay.

**Speaker B:** So, so I guess what we're doing is the um, so like the flow, so we so we have the uh the chat interface, um I guess we just kind of use like a, I don't know, like a very basic front end or we just kind of like hack, yeah we can have the component interface, we can...

**Speaker A:** You don't even need a chat interface maybe. It would be nice if we had just a voice kind of thing. Yeah. Yeah, but I mean first of all we need to figure out what we build, right? What is the niche case and then we figure out how do we populate or how do we interact with it. Okay. Because maybe we just put in a company name and it searches like all similar ones or so. It can also work.

**Speaker B:** Okay. So we definitely need um a database or I guess we have to find, figure out like what the database looks like. Um we need the uh the back end logic that kind of um serves as the uh the interface between our chat interface and the database. Not a problem. Um yeah and that's basically, and then we just kind of figure out the API calls to the chat. That will be also fine. Yeah.

**Speaker C:** So what I understood is uh in our first milestone we can hit a client interacting with an application. Um according to requirements he get the list of companies. That's all, right? That's the end goal, right?

**Speaker B:** Yeah, yeah.

**Speaker C:** And it does also notifies the enterprises that are listed upon the database.

**Speaker B:** Okay.

**Speaker C:** It could be.

**Speaker A:** So it's basically a sourcing solution if we find other companies.

**Speaker B:** Yeah and then we can kind of build out like more agentic things, tools from there. Yeah.

**Speaker A:** Yeah, but so data enrichment, what not. Yeah.

**Speaker C:** Okay. So what I understood is we need to first decide what, this can be one use case, basically data population. Yeah. Um, or data... data enrichment. Yeah. I guess um we can kind of figure out or like hack it with um, I don't know with uh kind of just having an agent that just kind of does a keyword searches on the database. Um kind of like through um I don't know it's called...

**Speaker C:** Semantic search?

**Speaker A:** I think you mean keyword because I would also say semantic...

**Speaker B:** It can be hybrid keyword plus...

**Speaker A:** I mentioned embedding the whole database of like all those companies in the US or so. Those are probably millions of companies.

**Speaker C:** Yeah it should be still be fast if we are...

**Speaker A:** Sorry?

**Speaker C:** You think it will it's reasonable to do? Because we also need to store those embeddings.

**Speaker B:** Yeah, it's fine. Like we are storing millions so it should be enough, like it should give results in few seconds. One or two.

**Speaker A:** I mean we could also start off with like just doing it in San Francisco or so or doing it in this county.

**Speaker B:** Yeah. Yeah, that would be fine. I think always to up the ante.

**Speaker A:** Yeah. Yeah. Probably hard, but let's see whether we can access that data.

**Speaker B:** Okay. I'm pretty sure in Germany you couldn't access that data. Probably pretty hard to find. Yeah. Um, okay, so data enrichments, um so we're doing a semantic search or like the keywords. Um yeah. It's a requirement, I guess.

**Speaker A:** I mean if you want something functional. Yeah. It's kind of getting there.

**Speaker C:** I think we are also a bit at the stage where we build three things actually. Uh, like I'm just confused about like how, how will be the interaction of a user with the platform? So like I, I'm not too much in sales so I just went out. So what I understood is it's something like a we are buying from an bigger enterprises. So what will be my flow? Like how we are uh like putting that into an agentic space? Like what what something else we are bringing than a normal like what I understood is like we are having bunch of databases of company and it's just something sitting which I'm asking question for my requirements and it's kind of giving me suggestions or also it's updating someone else that I'm a potential lead. Is that correct or there's something else that we are up to?

**Speaker A:** So the idea would be that the user chats through it with some Slack or so. And then the tool calls on the LLM decide what to do.

**Speaker B:** That I understood. He he does something to figure out to give me uh like a list of companies along with my specs that I'm asking about. Exactly. That answers it. But what I'm thinking is uh it's still easily be done today as well with web search. So might not be that complex.

**Speaker A:** There's yeah it can be done a lot with web search but it also populates the table and decides when to...

**Speaker B:** Okay we can have this ecosystem to be built for an enterprises to identify leads. Well also we want to have a uniform presentation of the data so it'd probably be, like a web search probably wouldn't be the most optimal for that since you kind of have to like parse through like natural language, different marketing what nots and all that. Whereas if you use a database it's kind of all in like a uniform presentation. It's kind of reduces the complexity of these uh of these uh operations.

**Speaker C:** I guess like maybe there are two things or one thing we need to decide. One is do we want to have a mini or like a co-pilot or helper, an intern that does little tasks such as, "Hey, for this lead, I just talked with it and note down they are not interested." And then it populates the table from the information I get and there's some smaller web search things and so on, but like smaller tools. Or we do something more complicated which is for example looking through all the um so doing a semantic or keyword search and so on and finding similar companies or leads and sourcing. So it's called sourcing basically. And this would be something completely different because it's one bigger project. So do we want to have like a small... something that can do many things and we have a cool chat interface and um we can just like talk to it and so on. Or do we want to have one thing where we have a front end and we put in I don't know, a company name and it searches everything itself and like we have this one use case. I think those are three, four small use cases and the thing with semantic search given the time today is probably one bigger use case that we make great.

**Speaker B:** Okay. I think that's something we need to decide. Um, I guess for a hackathon it just, I mean in terms of like um our like ability to compete with like other teams. I guess like the in terms of like the presentability of the idea or like the value um... I mean I don't know, I've like kind of thought about this, but is it, I guess is it better to have something that's more niche for like a certain use case or kind of more broad for like multiple use cases? Um but that's less, less um good at each one.

**Speaker C:** Yeah, same. Yeah, not the same thoughts. And that's exactly what we need to decide.

**Speaker B:** Yeah. What are your opinions on it?

**Speaker C:** Having a niche would be good because we'll be able to show a value proposition by EOD because going broad will, I don't know, because I have failed in a lot of hackathons by going broad because it it takes time sometimes, so we are not able to show the value proposition at end. So having a...

**Speaker A:** Yeah, maybe let's go niche because in the end when we go broad, and we build this, this can be ChatGPT connected to Zapier. Okay. Probably that's not so valuable. Yeah. Let's go niche.

**Speaker B:** Well then we can also kind of like expand upon in a niche if we have time. Yeah.

**Speaker C:** Okay.

**Speaker B:** So, so I guess what we're doing is the um, so like the flow, so we so we have the uh the chat interface, um I guess we just kind of use like a, I don't know, like a very basic front end or we just kind of like hack, yeah we can have the component interface, we can...

**Speaker A:** You don't even need a chat interface maybe. It would be nice if we had just a voice kind of thing. Yeah. Yeah, but I mean first of all we need to figure out what we build, right? What is the niche case and then we figure out how do we populate or how do we interact with it. Okay. Because maybe we just put in a company name and it searches like all similar ones or so. It can also work.

**Speaker B:** Okay. So we definitely need um a database or I guess we have to find, figure out like what the database looks like. Um we need the uh the back end logic that kind of um serves as the uh the interface between our chat interface and the database. Not a problem. Um yeah and that's basically, and then we just kind of figure out the API calls to the chat. That will be also fine. Yeah.

**Speaker C:** So what I understood is uh in our first milestone we can hit a client interacting with an application. Um according to requirements he get the list of companies. That's all, right? That's the end goal, right?

**Speaker B:** Yeah, yeah.

**Speaker C:** And it does also notifies the enterprises that are listed upon the database.

**Speaker B:** Okay.

**Speaker C:** It could be.

**Speaker A:** So it's basically a sourcing solution if we find other companies.

**Speaker B:** Yeah and then we can kind of build out like more agentic things, tools from there. Yeah.

**Speaker A:** Yeah, but so data enrichment, what not. Yeah.

**Speaker C:** Okay. So what I understood is we need to first decide what, this can be one use case, basically data population. Yeah. Um, or data... data enrichment. Yeah. I guess um we can kind of figure out or like hack it with um, I don't know with uh kind of just having an agent that just kind of does a keyword searches on the database. Um kind of like through um I don't know it's called...

**Speaker C:** Semantic search?

**Speaker A:** I think you mean keyword because I would also say semantic...

**Speaker B:** It can be hybrid keyword plus...

**Speaker A:** I mentioned embedding the whole database of like all those companies in the US or so. Those are probably millions of companies.

**Speaker C:** Yeah it should be still be fast if we are...

**Speaker A:** Sorry?

**Speaker C:** You think it will it's reasonable to do? Because we also need to store those embeddings.

**Speaker B:** Yeah, it's fine. Like we are storing millions so it should be enough, like it should give results in few seconds. One or two.

**Speaker A:** I mean we could also start off with like just doing it in San Francisco or so or doing it in this county.

**Speaker B:** Yeah. Yeah, that would be fine. I think always to up the ante.

**Speaker A:** Yeah. Yeah. Probably hard, but let's see whether we can access that data.

**Speaker B:** Okay. I'm pretty sure in Germany you couldn't access that data. Probably pretty hard to find. Yeah. Um, okay, so data enrichments, um so we're doing a semantic search or like the keywords. Um yeah. It's a requirement, I guess.

**Speaker A:** I mean if you want something functional. Yeah. It's kind of getting there.

**Speaker C:** I think we are also a bit at the stage where we build three things actually. Uh, like I'm just confused about like how, how will be the interaction of a user with the platform? So like I, I'm not too much in sales so I just went out. So what I understood is it's something like a we are buying from an bigger enterprises. So what will be my flow? Like how we are uh like putting that into an agentic space? Like what what something else we are bringing than a normal like what I understood is like we are having bunch of databases of company and it's just something sitting which I'm asking question for my requirements and it's kind of giving me suggestions or also it's updating someone else that I'm a potential lead. Is that correct or there's something else that we are up to?

**Speaker A:** So the idea would be that the user chats through it with some Slack or so. And then the tool calls on the LLM decide what to do.

**Speaker B:** That I understood. He he does something to figure out to give me uh like a list of companies along with my specs that I'm asking about. Exactly. That answers it. But what I'm thinking is uh it's still easily be done today as well with web search. So might not be that complex.

**Speaker A:** There's yeah it can be done a lot with web search but it also populates the table and decides when to...

**Speaker B:** Okay we can have this ecosystem to be built for an enterprises to identify leads. Well also we want to have a uniform presentation of the data so it'd probably be, like a web search probably wouldn't be the most optimal for that since you kind of have to like parse through like natural language, different marketing what nots and all that. Whereas if you use a database it's kind of all in like a uniform presentation. It's kind of reduces the complexity of these uh of these uh operations.

**Speaker C:** I guess like maybe there are two things or one thing we need to decide. One is do we want to have a mini or like a co-pilot or helper, an intern that does little tasks such as, "Hey, for this lead, I just talked with it and note down they are not interested." And then it populates the table from the information I get and there's some smaller web search things and so on, but like smaller tools. Or we do something more complicated which is for example looking through all the um so doing a semantic or keyword search and so on and finding similar companies or leads and sourcing. So it's called sourcing basically. And this would be something completely different because it's one bigger project. So do we want to have like a small... something that can do many things and we have a cool chat interface and um we can just like talk to it and so on. Or do we want to have one thing where we have a front end and we put in I don't know, a company name and it searches everything itself and like we have this one use case. I think those are three, four small use cases and the thing with semantic search given the time today is probably one bigger use case that we make great.

**Speaker B:** Okay. I think that's something we need to decide. Um, I guess for a hackathon it just, I mean in terms of like um our like ability to compete with like other teams. I guess like the in terms of like the presentability of the idea or like the value um... I mean I don't know, I've like kind of thought about this, but is it, I guess is it better to have something that's more niche for like a certain use case or kind of more broad for like multiple use cases? Um but that's less, less um good at each one.

**Speaker C:** Yeah, same. Yeah, not the same thoughts. And that's exactly what we need to decide.

**Speaker B:** Yeah. What are your opinions on it?

**Speaker C:** Having a niche would be good because we'll be able to show a value proposition by EOD because going broad will, I don't know, because I have failed in a lot of hackathons by going broad because it it takes time sometimes, so we are not able to show the value proposition at end. So having a...

**Speaker A:** Yeah, maybe let's go niche because in the end when we go broad, and we build this, this can be ChatGPT connected to Zapier. Okay. Probably that's not so valuable. Yeah. Let's go niche.

**Speaker B:** Well then we can also kind of like expand upon in a niche if we have time. Yeah.

**Speaker C:** Okay.

**Speaker B:** So, so I guess what we're doing is the um, so like the flow, so we so we have the uh the chat interface, um I guess we just kind of use like a, I don't know, like a very basic front end or we just kind of like hack, yeah we can have the component interface, we can...

**Speaker A:** You don't even need a chat interface maybe. It would be nice if we had just a voice kind of thing. Yeah. Yeah, but I mean first of all we need to figure out what we build, right? What is the niche case and then we figure out how do we populate or how do we interact with it. Okay. Because maybe we just put in a company name and it searches like all similar ones or so. It can also work.

**Speaker B:** Okay. So we definitely need um a database or I guess we have to find, figure out like what the database looks like. Um we need the uh the back end logic that kind of um serves as the uh the interface between our chat interface and the database. Not a problem. Um yeah and that's basically, and then we just kind of figure out the API calls to the chat. That will be also fine. Yeah.

**Speaker C:** So what I understood is uh in our first milestone we can hit a client interacting with an application.Um according to requirements he get the list of companies. That's all, right? That's the end goal, right?

**Speaker B:** Yeah, yeah.

**Speaker C:** And it does also notifies the enterprises that are listed upon the database.

**Speaker B:** Okay.

**Speaker C:** It could be.

**Speaker A:** So it's basically a sourcing solution if we find other companies.

**Speaker B:** Yeah and then we can kind of build out like more agentic things, tools from there. Yeah.

**Speaker A:** Yeah, but so data enrichment, what not. Yeah.

**Speaker C:** Okay. So what I understood is we need to first decide what, this can be one use case, basically data population. Yeah. Um, or data... data enrichment. Yeah. I guess um we can kind of figure out or like hack it with um, I don't know with uh kind of just having an agent that just kind of does a keyword searches on the database. Um kind of like through um I don't know it's called...

**Speaker C:** Semantic search?

**Speaker A:** I think you mean keyword because I would also say semantic...

**Speaker B:** It can be hybrid keyword plus...

**Speaker A:** I mentioned embedding the whole database of like all those companies in the US or so. Those are probably millions of companies.

**Speaker C:** Yeah it should be still be fast if we are...

**Speaker A:** Sorry?

**Speaker C:** You think it will it's reasonable to do? Because we also need to store those embeddings.

**Speaker B:** Yeah, it's fine. Like we are storing millions so it should be enough, like it should give results in few seconds. One or two.

**Speaker A:** I mean we could also start off with like just doing it in San Francisco or so or doing it in this county.

**Speaker B:** Yeah. Yeah, that would be fine. I think always to up the ante.

**Speaker A:** Yeah. Yeah. Probably hard, but let's see whether we can access that data.

**Speaker B:** Okay. I'm pretty sure in Germany you couldn't access that data. Probably pretty hard to find. Yeah. Um, okay, so data enrichments, um so we're doing a semantic search or like the keywords. Um yeah. It's a requirement, I guess.

**Speaker A:** I mean if you want something functional. Yeah. It's kind of getting there.

**Speaker C:** I think we are also a bit at the stage where we build three things actually. Uh, like I'm just confused about like how, how will be the interaction of a user with the platform? So like I, I'm not too much in sales so I just went out. So what I understood is it's something like a we are buying from an bigger enterprises. So what will be my flow? Like how we are uh like putting that into an agentic space? Like what what something else we are bringing than a normal like what I understood is like we are having bunch of databases of company and it's just something sitting which I'm asking question for my requirements and it's kind of giving me suggestions or also it's updating someone else that I'm a potential lead. Is that correct or there's something else that we are up to?

**Speaker A:** So the idea would be that the user chats through it with some Slack or so. And then the tool calls on the LLM decide what to do.

**Speaker B:** That I understood. He he does something to figure out to give me uh like a list of companies along with my specs that I'm asking about. Exactly. That answers it. But what I'm thinking is uh it's still easily be done today as well with web search. So might not be that complex.

**Speaker A:** There's yeah it can be done a lot with web search but it also populates the table and decides when to...

**Speaker B:** Okay we can have this ecosystem to be built for an enterprises to identify leads. Well also we want to have a uniform presentation of the data so it'd probably be, like a web search probably wouldn't be the most optimal for that since you kind of have to like parse through like natural language, different marketing what nots and all that. Whereas if you use a database it's kind of all in like a uniform presentation. It's kind of reduces the complexity of these uh of these uh operations.

**Speaker C:** I guess like maybe there are two things or one thing we need to decide. One is do we want to have a mini or like a co-pilot or helper, an intern that does little tasks such as, "Hey, for this lead, I just talked with it and note down they are not interested." And then it populates the table from the information I get and there's some smaller web search things and so on, but like smaller tools. Or we do something more complicated which is for example looking through all the um so doing a semantic or keyword search and so on and finding similar companies or leads and sourcing. So it's called sourcing basically. And this would be something completely different because it's one bigger project. So do we want to have like a small... something that can do many things and we have a cool chat interface and um we can just like talk to it and so on. Or do we want to have one thing where we have a front end and we put in I don't know, a company name and it searches everything itself and like we have this one use case. I think those are three, four small use cases and the thing with semantic search given the time today is probably one bigger use case that we make great.

**Speaker B:** Okay. I think that's something we need to decide. Um, I guess for a hackathon it just, I mean in terms of like um our like ability to compete with like other teams. I guess like the in terms of like the presentability of the idea or like the value um... I mean I don't know, I've like kind of thought about this, but is it, I guess is it better to have something that's more niche for like a certain use case or kind of more broad for like multiple use cases? Um but that's less, less um good at each one.

**Speaker C:** Yeah, same. Yeah, not the same thoughts. And that's exactly what we need to decide.

**Speaker B:** Yeah. What are your opinions on it?

**Speaker C:** Having a niche would be good because we'll be able to show a value proposition by EOD because going broad will, I don't know, because I have failed in a lot of hackathons by going broad because it it takes time sometimes, so we are not able to show the value proposition at end. So having a...

**Speaker A:** Yeah, maybe let's go niche because in the end when we go broad, and we build this, this can be ChatGPT connected to Zapier. Okay. Probably that's not so valuable. Yeah. Let's go niche.

**Speaker B:** Well then we can also kind of like expand upon in a niche if we have time. Yeah.

**Speaker C:** Okay.

**Speaker B:** So, so I guess what we're doing is the um, so like the flow, so we so we have the uh the chat interface, um I guess we just kind of use like a, I don't know, like a very basic front end or we just kind of like hack, yeah we can have the component interface, we can...

**Speaker A:** You don't even need a chat interface maybe. It would be nice if we had just a voice kind of thing. Yeah. Yeah, but I mean first of all we need to figure out what we build, right? What is the niche case and then we figure out how do we populate or how do we interact with it. Okay. Because maybe we just put in a company name and it searches like all similar ones or so. It can also work.

**Speaker B:** Okay. So we definitely need um a database or I guess we have to find, figure out like what the database looks like. Um we need the uh the back end logic that kind of um serves as the uh the interface between our chat interface and the database. Not a problem. Um yeah and that's basically, and then we just kind of figure out the API calls to the chat. That will be also fine. Yeah.

**Speaker C:** So what I understood is uh in our first milestone we can hit a client interacting with an application. Um according to requirements he get the list of companies. That's all, right? That's the end goal, right?

**Speaker B:** Yeah, yeah.

**Speaker C:** And it does also notifies the enterprises that are listed upon the database.

**Speaker B:** Okay.

**Speaker C:** It could be.

**Speaker A:** So it's basically a sourcing solution if we find other companies.

**Speaker B:** Yeah and then we can kind of build out like more agentic things, tools from there. Yeah.

**Speaker A:** Yeah, but so data enrichment, what not. Yeah.

**Speaker C:** Okay. So what I understood is we need to first decide what, this can be one use case, basically data population. Yeah. Um, or data... data enrichment. Yeah. I guess um we can kind of figure out or like hack it with um, I don't know with uh kind of just having an agent that just kind of does a keyword searches on the database. Um kind of like through um I don't know it's called...

**Speaker C:** Semantic search?

**Speaker A:** I think you mean keyword because I would also say semantic...

**Speaker B:** It can be hybrid keyword plus...

**Speaker A:** I mentioned embedding the whole database of like all those companies in the US or so. Those are probably millions of companies.

**Speaker C:** Yeah it should be still be fast if we are...

**Speaker A:** Sorry?

**Speaker C:** You think it will it's reasonable to do? Because we also need to store those embeddings.

**Speaker B:** Yeah, it's fine. Like we are storing millions so it should be enough, like it should give results in few seconds. One or two.

**Speaker A:** I mean we could also start off with like just doing it in San Francisco or so or doing it in this county.

**Speaker B:** Yeah. Yeah, that would be fine. I think always to up the ante.

**Speaker A:** Yeah. Yeah. Probably hard, but let's see whether we can access that data.

**Speaker B:** Okay. I'm pretty sure in Germany you couldn't access that data. Probably pretty hard to find. Yeah. Um, okay, so data enrichments, um so we're doing a semantic search or like the keywords. Um yeah. It's a requirement, I guess.

**Speaker A:** I mean if you want something functional. Yeah. It's kind of getting there.

**Speaker C:** I think we are also a bit at the stage where we build three things actually. Uh, like I'm just confused about like how, how will be the interaction of a user with the platform? So like I, I'm not too much in sales so I just went out. So what I understood is it's something like a we are buying from an bigger enterprises. So what will be my flow? Like how we are uh like putting that into an agentic space? Like what what something else we are bringing than a normal like what I understood is like we are having bunch of databases of company and it's just something sitting which I'm asking question for my requirements and it's kind of giving me suggestions or also it's updating someone else that I'm a potential lead. Is that correct or there's something else that we are up to?

**Speaker A:** So the idea would be that the user chats through it with some Slack or so. And then the tool calls on the LLM decide what to do.

**Speaker B:** That I understood. He he does something to figure out to give me uh like a list of companies along with my specs that I'm asking about. Exactly. That answers it. But what I'm thinking is uh it's still easily be done today as well with web search. So might not be that complex.

**Speaker A:** There's yeah it can be done a lot with web search but it also populates the table and decides when to...

**Speaker B:** Okay we can have this ecosystem to be built for an enterprises to identify leads. Well also we want to have a uniform presentation of the data so it'd probably be, like a web search probably wouldn't be the most optimal for that since you kind of have to like parse through like natural language, different marketing what nots and all that. Whereas if you use a database it's kind of all in like a uniform presentation. It's kind of reduces the complexity of these uh of these uh operations.

**Speaker C:** I guess like maybe there are two things or one thing we need to decide. One is do we want to have a mini or like a co-pilot or helper, an intern that does little tasks such as, "Hey, for this lead, I just talked with it and note down they are not interested." And then it populates the table from the information I get and there's some smaller web search things and so on, but like smaller tools. Or we do something more complicated which is for example looking through all the um so doing a semantic or keyword search and so on and finding similar companies or leads and sourcing. So it's called sourcing basically. And this would be something completely different because it's one bigger project. So do we want to have like a small... something that can do many things and we have a cool chat interface and um we can just like talk to it and so on. Or do we want to have one thing where we have a front end and we put in I don't know, a company name and it searches everything itself and like we have this one use case. I think those are three, four small use cases and the thing with semantic search given the time today is probably one bigger use case that we make great.

**Speaker B:** Okay. I think that's something we need to decide. Um, I guess for a hackathon it just, I mean in terms of like um our like ability to compete with like other teams. I guess like the in terms of like the presentability of the idea or like the value um... I mean I don't know, I've like kind of thought about this, but is it, I guess is it better to have something that's more niche for like a certain use case or kind of more broad for like multiple use cases? Um but that's less, less um good at each one.

**Speaker C:** Yeah, same. Yeah, not the same thoughts. And that's exactly what we need to decide.

**Speaker B:** Yeah. What are your opinions on it?

**Speaker C:** Having a niche would be good because we'll be able to show a value proposition by EOD because going broad will, I don't know, because I have failed in a lot of hackathons by going broad because it it takes time sometimes, so we are not able to show the value proposition at end. So having a...

**Speaker A:** Yeah, maybe let's go niche because in the end when we go broad, and we build this, this can be ChatGPT connected to Zapier. Okay. Probably that's not so valuable. Yeah. Let's go niche.

**Speaker B:** Well then we can also kind of like expand upon in a niche if we have time. Yeah.

**Speaker C:** Okay.

**Speaker B:** So, so I guess what we're doing is the um, so like the flow, so we so we have the uh the chat interface, um I guess we just kind of use like a, I don't know, like a very basic front end or we just kind of like hack, yeah we can have the component interface, we can...

**Speaker A:** You don't even need a chat interface maybe. It would be nice if we had just a voice kind of thing. Yeah. Yeah, but I mean first of all we need to figure out what we build, right? What is the niche case and then we figure out how do we populate or how do we interact with it. Okay. Because maybe we just put in a company name and it searches like all similar ones or so. It can also work.

**Speaker B:** Okay. So we definitely need um a database or I guess we have to find, figure out like what the database looks like. Um we need the uh the back end logic that kind of um serves as the uh the interface between our chat interface and the database. Not a problem. Um yeah and that's basically, and then we just kind of figure out the API calls to the chat. That will be also fine. Yeah.

**Speaker C:** So what I understood is uh in our first milestone we can hit a client interacting with an application. Um according to requirements he get the list of companies. That's all, right? That's the end goal, right?

**Speaker B:** Yeah, yeah.

**Speaker C:** And it does also notifies the enterprises that are listed upon the database.

**Speaker B:** Okay.

**Speaker C:** It could be.

**Speaker A:** So it's basically a sourcing solution if we find other companies.

**Speaker B:** Yeah and then we can kind of build out like more agentic things, tools from there. Yeah.

**Speaker A:** Yeah, but so data enrichment, what not. Yeah.

**Speaker C:** Okay. So what I understood is we need to first decide what, this can be one use case, basically data population. Yeah. Um, or data... data enrichment. Yeah. I guess um we can kind of figure out or like hack it with um, I don't know with uh kind of just having an agent that just kind of does a keyword searches on the database