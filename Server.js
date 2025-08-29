import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ---- simple API key auth (protect all but /health)
const API_KEY = process.env.API_KEY || "dev-key-change-me";
app.use((req,res,next)=>{
  if (req.path === "/health") return next();
  if (req.headers["x-api-key"] !== API_KEY) return res.status(401).json({error:"unauthorized"});
  next();
});

// ---- health
app.get("/health", (req,res)=> res.json({ok:true}));

// ---- stub endpoints so Actions work now
app.post("/clients", (req,res)=> res.json({clientId:"c_"+Date.now(), dashboardUrl:"https://app.nysai.ai/c/"+Date.now()}));
app.post("/integrations/twilio/provision-number", (req,res)=> res.json({number:"+15551234567", messagingServiceSid:"MGxxxx"}));
app.post("/integrations/crm/connect", (req,res)=> res.json({ok:true}));
app.post("/embeds/form/fast-lead", (req,res)=> res.json({html:"<form id='nysai-fast'>...</form>"}));
app.post("/embeds/chat/concierge", (req,res)=> res.json({html:"<script>/* chat */</script>"}));
app.post("/embeds/qr/open-house", (req,res)=> res.json({qrPng:"https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=https://tally.so/r/demo", formUrl:"https://tally.so/r/demo"}));
app.post("/automations/zap/bundle", (req,res)=> res.json({ok:true}));
app.post("/analytics/posthog/enable", (req,res)=> res.json({snippet:"<script>// posthog</script>"}));
app.post("/reviews/enable", (req,res)=> res.json({ok:true}));
app.post("/lead", (req,res)=> res.json({ok:true}));
app.post("/tests/sms", (req,res)=> res.json({ok:true}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log("Nysai API on :"+PORT));
