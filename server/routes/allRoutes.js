const express = require("express");
const axios = require("axios");
const router = express.Router();
const supabase = require("../supabaseClient");

router.use(express.json());

const today = new Date().toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const AI_API_KEY = process.env.AI_API_KEY;
const AI_API_URL = process.env.AI_API_URL;
const SYS_PROMPT = process.env.SYS_PROMPT.replace("{{date}}", today);
const SUPABASE_URL = process.env.SUPABASE_URL;
const IMAGE_URL = process.env.IMAGE_URL;

router.post("/analyze", async (req, res) => {
  const url = req.body.url;
  const type = req.body.type;

  try {
    const { data: existing, error: fetchError } = await supabase
      .from("facts")
      .select("*")
      .eq("social_url", url)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Supabase fetch error:", fetchError.message);
      return res.status(500).json({ error: "Database fetch failed" });
    }

    if (existing) {
      return res.status(200).json({ data: existing });
    }

    const response = await axios.get(`${IMAGE_URL}/?${type}=${url}`, {
      responseType: "arraybuffer",
    });

    const bufferImage = Buffer.from(response.data, "binary");

    function generateRandomId(length = 20) {
      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let id = "";
      for (let i = 0; i < length; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
    }

    const imageName = `${generateRandomId()}.png`;

    const { data: imageData, error: uploadError } = await supabase.storage
      .from("images")
      .upload(imageName, bufferImage, {
        contentType: "image/png",
      });

    if (uploadError) {
      console.error("Upload failed:", uploadError.message);
      return res.status(500).json({ error: "Image upload failed" });
    }

    const SupaImageUrl = `${SUPABASE_URL}/storage/v1/object/public/images/${imageData.path}`;

    const requestBody = {
      model: "google/gemini-2.0-flash-exp:free",
      // plugins: [{ id: "web", max_results: 5 }],
      messages: [
        {
          role: "system",
          content: [{ type: "text", text: SYS_PROMPT }],
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Fact Check This" },
            { type: "image_url", image_url: { url: SupaImageUrl } },
          ],
        },
      ],
    };

    const AiResponse = await axios.post(AI_API_URL, requestBody, {
      headers: {
        Authorization: `Bearer ${AI_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (AiResponse.status === 200) {
      let resData = AiResponse.data.choices[0].message.content;

      const cleanedResData = resData
        .replace("```json\n", "")
        .replace("\n```", "");

      const parsedResData = JSON.parse(cleanedResData);

      const { data: insertedData, error: insertError } = await supabase
        .from("facts")
        .insert([
          {
            result: parsedResData,
            social_url: url,
            image_url: SupaImageUrl,
          },
        ])
        .select();

      if (insertError) {
        console.error("Supabase insert error:", insertError.message);
        return res.status(500).json({ error: "Database insert failed" });
      }

      const insertedRow = insertedData[0];

      return res.status(200).json({
        data: {
          id: insertedRow.id,
        },
      });
    } else {
      return res.status(500).json({ error: "AI API did not return 200 OK" });
    }
  } catch (err) {
    console.error("Unexpected error:", err.message || err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/report/:id", async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("facts")
    .select("id, created_at, social_url, result")
    .eq("id", id)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.json(data);
});

module.exports = router;
