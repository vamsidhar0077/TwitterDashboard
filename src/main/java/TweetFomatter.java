import jdk.jfr.events.FileReadEvent;
import org.json.JSONObject;

import java.io.*;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

/**
 * Created By ReddyGadu
 * Created On 11/24/19
 * Project Name IR
 **/
public class TweetFomatter {

    public Map<String, String> topicAndSenti = new HashMap<>();

    public void tweetFormatter() throws IOException {
        String file = "/home/vamsidhar/Desktop/producer/Tweets";
        for (File each : new File(file).listFiles()) {
            String finalDir = "/home/vamsidhar/Desktop/consumer/Tweets/";
            String fileName = each.getName().replace("ManipulatedTweets.json", "");
            finalDir = finalDir + fileName + "_modified.json";
            File finalFile = new File(finalDir);

            if (!finalFile.exists())
                finalFile.createNewFile();

            FileWriter writer = new FileWriter(finalFile);
            FileReader fileReader = new FileReader(each);
            BufferedReader br = new BufferedReader(fileReader);
            String line = "";
            while ((line = br.readLine()) != null) {
                try {
                    Map<String, String> local = new HashMap<>();
                    JSONObject jsonObject = new JSONObject(line);
                    local.put("\"" + "tweet_text" + "\"", "\"" + ((String) jsonObject.get("full_text")).replace("\n", " ").replace("\"", "").replace("\'", "") + "\"");
                    local.put("\"" + "country" + "\"", "\"" + (String) jsonObject.get("country") + "\"");
                    local.put("\"" + "name" + "\"", "\"" + (String) jsonObject.get("poi_name") + "\"");
                    local.put("\"" + "id_str" + "\"", "\"" + (String) jsonObject.get("id_str") + "\"");
                    local.put("\"" + "lang" + "\"", "\"" + (String) jsonObject.get("tweet_lang") + "\"");
                    local.put("\"" + "created_at" + "\"", "\"" + (String) jsonObject.get("created_at") + "\"");
                    local.put("\"" + "mentions" + "\"", "\"" + (String) jsonObject.get("mentions") + "\"");
                    local.put("\"" + "retweeted" + "\"", "\"" + (String) jsonObject.get("retweeted").toString() + "\"");
                    local.put("\"" + "hashtags" + "\"", "\"" + (String) jsonObject.get("hashtags") + "\"");
                    local.put("\"" + "favorite_count" + "\"", "\"" + "" + jsonObject.get("favorite_count") + "\"");
                    JSONObject user = (JSONObject) jsonObject.get("user");
                    local.put("\"" + "user_name" + "\"", "\"" + (String) user.get("screen_name") + "\"");
                    local.put("\"" + "location" + "\"", "\"" + (String) user.get("location") + "\"");
                    local.put("\"" + "verified" + "\"", "\"" + (String) user.get("verified").toString() + "\"");
                    System.out.println(local);
                    writer.write(local.toString().replace("=", ":") + "\n");
                } catch (Exception e) {

                }
            }
            writer.close();
            System.out.println();

        }

    }

    public void replyFormatter() throws IOException {
        String file = "/home/vamsidhar/Desktop/producer/Replies/";
        for (File each : new File(file).listFiles()) {
            String finalDir = "/home/vamsidhar/Desktop/consumer/Replies/";
            String fileName = each.getName().replace("ManipulatedReplies.json", "");
            finalDir = finalDir + fileName + "Replies.json";
            File finalFile = new File(finalDir);

            if (!finalFile.exists())
                finalFile.createNewFile();

            FileWriter writer = new FileWriter(finalFile);
            FileReader fileReader = new FileReader(each);
            BufferedReader br = new BufferedReader(fileReader);
            String line = "";
            while ((line = br.readLine()) != null) {
                try {
                    Map<String, String> local = new HashMap<>();
                    JSONObject jsonObject = new JSONObject(line);
                    local.put("\"" + "tweet_text" + "\"", "\"" + ((String) jsonObject.get("tweet_text")).replace("\n", " ").replace("\"", "").replace("\'", "") + "\"");
                    local.put("\"" + "country" + "\"", "\"" + (String) jsonObject.get("country") + "\"");
                    local.put("\"" + "name" + "\"", "\"" + (String) jsonObject.get("poi_name") + "\"");
                    local.put("\"" + "id_str" + "\"", "\"" + (String) jsonObject.get("id_str") + "\"");
                    local.put("\"" + "lang" + "\"", "\"" + (String) jsonObject.get("tweet_lang") + "\"");
                    local.put("\"" + "created_at" + "\"", "\"" + (String) jsonObject.get("created_at") + "\"");
                    local.put("\"" + "mentions" + "\"", "\"" + (String) jsonObject.get("mentions") + "\"");
                    local.put("\"" + "retweeted" + "\"", "\"" + (String) jsonObject.get("retweeted").toString() + "\"");
                    local.put("\"" + "hashtags" + "\"", "\"" + (String) jsonObject.get("hashtags") + "\"");
                    local.put("\"" + "favorite_count" + "\"", "\"" + "" + jsonObject.get("favorite_count") + "\"");
                    JSONObject user = (JSONObject) jsonObject.get("user");
                    local.put("\"" + "user_name" + "\"", "\"" + (String) user.get("screen_name") + "\"");
                    local.put("\"" + "location" + "\"", "\"" + (String) user.get("location") + "\"");
                    local.put("\"" + "verified" + "\"", "\"" + (String) user.get("verified").toString() + "\"");
                    System.out.println(local);
                    writer.write(local.toString().replace("=", ":") + "\n");
                } catch (Exception e) {

                }
            }
            writer.close();
            System.out.println();
        }
    }


    public void hashTagsFormatter() throws IOException {
        String file = "/home/vamsidhar/Desktop/producer/Hashtags/";
        for (File each : new File(file).listFiles()) {
            String finalDir = "/home/vamsidhar/Desktop/consumer/Hashtags/";
            String fileName = each.getName().replace("HashMentions.json", "");
            finalDir = finalDir + fileName + "Hashtags.json";
            File finalFile = new File(finalDir);
            System.out.println(fileName);
            if (!finalFile.exists())
                finalFile.createNewFile();

            FileWriter writer = new FileWriter(finalFile);
            FileReader fileReader = new FileReader(each);
            BufferedReader br = new BufferedReader(fileReader);
            String line = "";
            while ((line = br.readLine()) != null) {
                try {
                    Map<String, String> local = new HashMap<>();
                    JSONObject jsonObject = new JSONObject(line);
                    local.put("\"" + "tweet_text" + "\"", "\"" + ((String) jsonObject.get("text")).replace("\n", " ").replace("\"", "").replace("\'", "") + "\"");
                    local.put("\"" + "country" + "\"", "\"" + (String) jsonObject.get("country") + "\"");
                    local.put("\"" + "name" + "\"", "\"" + (String) jsonObject.get("poi_name") + "\"");
                    local.put("\"" + "id_str" + "\"", "\"" + (String) jsonObject.get("id_str") + "\"");
                    local.put("\"" + "lang" + "\"", "\"" + (String) jsonObject.get("lang") + "\"");
                    local.put("\"" + "created_at" + "\"", "\"" + (String) jsonObject.get("created_at") + "\"");
                    local.put("\"" + "mentions" + "\"", "\"" + (String) jsonObject.get("mentions") + "\"");
                    local.put("\"" + "retweeted" + "\"", "\"" + (String) jsonObject.get("retweeted").toString() + "\"");
                    local.put("\"" + "hashtags" + "\"", "\"" + (String) jsonObject.get("hashtags") + "\"");
                    local.put("\"" + "favorite_count" + "\"", "\"" + "" + jsonObject.get("favorite_count") + "\"");
                    JSONObject user = (JSONObject) jsonObject.get("user");
                    local.put("\"" + "user_name" + "\"", "\"" + (String) user.get("screen_name") + "\"");
                    local.put("\"" + "location" + "\"", "\"" + (String) user.get("location") + "\"");
                    local.put("\"" + "verified" + "\"", "\"" + (String) user.get("verified").toString() + "\"");
                    System.out.println(local);
                    writer.write(local.toString().replace("=", ":") + "\n");
                } catch (Exception e) {

                }
            }
            writer.close();
            System.out.println();
        }
    }

    public void topicFormatter() throws IOException {
        String file = "/home/vamsidhar/Desktop/producer/Tweets/";
        for (File each : new File(file).listFiles()) {

            FileReader fileReader = new FileReader(each);
            BufferedReader br = new BufferedReader(fileReader);
            String line = "";
            while ((line = br.readLine()) != null) {
                String finalDir = "/home/vamsidhar/Desktop/topic/";
                Map<String, String> local = new HashMap<>();
                JSONObject jsonObject = new JSONObject(line);
                String country = (String) jsonObject.get("country");
                String fileName = each.getName().replace("ManipulatedTweets.json", "");
                finalDir = finalDir + country + "/" + country + ".csv";
                File finalFile = new File(finalDir);
                if (!finalFile.exists()) {
                    finalFile.createNewFile();
                }
                FileWriter writer = new FileWriter(finalFile, true);

                local.put("\"" + "tweet_text" + "\"", "\"" + ((String) jsonObject.get("full_text")).replace("\n", " ").replace("\"", "").replace("\'", "") + "\"");
                System.out.println(local);
                writer.write(((String) jsonObject.get("full_text")).replace("\n", " ").replace("\"", "").replace("\'", "").replace("=", ":").replace(",", "") + "\n");
                writer.close();
            }
            System.out.println();

        }
    }

    public void idTextCsvGen() {
        try {
            String file = "/home/vamsidhar/Desktop/consumer/Tweets";
            for (File each : new File(file).listFiles()) {
                FileReader fileReader = new FileReader(each);
                BufferedReader br = new BufferedReader(fileReader);
                String line = "";
                while ((line = br.readLine()) != null) {
                    String finalDir = "/home/vamsidhar/Desktop/TweetsText/";
                    try {
                        JSONObject jsonObject = new JSONObject(line);
                        finalDir = finalDir + "IdText.txt";
                        File finalFile = new File(finalDir);
                        if (!finalFile.exists())
                            finalFile.createNewFile();
                        FileWriter writer = new FileWriter(finalFile, true);
                        writer.write(jsonObject.get("id_str") + "," + ((String) jsonObject.get("tweet_text")).replace("\n", " ").replace("\"", "").replace("\'", "").replace("=", ":").replace(",", "") + "\n");
                        writer.close();
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
                System.out.println();
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    public void getLangTweets(String lang) throws IOException {
        String file = "/home/vamsidhar/Desktop/topic";
        for (File each : new File(file).listFiles()) {
            if (each.isDirectory())
                continue;

            FileReader fileReader = new FileReader(each);
            BufferedReader br = new BufferedReader(fileReader);
            String line = "";
            FileWriter writer = new FileWriter(new File("/home/vamsidhar/Desktop/TweetsText/" + lang + ".txt"), true);
            while ((line = br.readLine()) != null) {
                try {
                    JSONObject jsonObject = new JSONObject(line);
                    if (((String) jsonObject.get("lang")).equals(lang)) {
                        String id = (String) jsonObject.get("id_str");
                        String text = (String) jsonObject.get("tweet_text");
                        writer.write(id + "," + text + "\n");

                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            writer.close();
        }
    }

    public void readPtTranslatedTweets(String filePath) {
        try (FileReader reader = new FileReader(new File(filePath))) {
            BufferedReader bw = new BufferedReader(reader);
            String line = "";
            while ((line = bw.readLine()) != null) {
                String[] values = line.split(",");
                topicAndSenti.put(values[1], Arrays.toString(values));
            }
            System.out.println(topicAndSenti.size());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void addToJSON(String filepath) throws IOException {
        File file = new File(filepath);
        for (File each : file.listFiles()) {
            FileReader reader = new FileReader(each);
            String name = each.getName();
            FileWriter writer = new FileWriter(new File(file.getPath() + "/Naya_" + name));
            BufferedReader br = new BufferedReader(reader);
            String line = "";
            String[] sentiments = new String[]{"positive", "negative", "neutral"};
            String[] topics = new String[]{"Politics", "Comment", "Campaign", "Violence", "Social Welfare", "Elections", "Economy", "Commend","Vote", "Railway", "News"};
            while ((line = br.readLine()) != null) {
                try {
                    JSONObject jsonObject = new JSONObject(line);
                    jsonObject.put("sentiment", sentiments[new Random().nextInt(2)]);
                    jsonObject.put("topic", topics[new Random().nextInt(10)]);
                    if (topicAndSenti.containsKey(jsonObject.get("id_str"))) {
                        String value = topicAndSenti.get(jsonObject.get("id_str"));
                        String[] values = value.split(",");
                        jsonObject.put("sentiment", values[3]);
                        jsonObject.put("topic", values[4]);
                    }
                    writer.write(jsonObject.toString() + "\n");
                } catch (Exception e) {

                }

            }
            writer.close();
        }

    }


    public static void main(String[] args) throws IOException {
        TweetFomatter tf = new TweetFomatter();
//        tf.tweetFormatter();
//        tf.replyFormatter();
//        tf.hashTagsFormatter();
//        tf.topicFormatter();
//        tf.idTextCsvGen();
//        tf.getLangTweets("en");
        tf.readPtTranslatedTweets("/home/vamsidhar/Desktop/Senti/merged.txt");
        tf.addToJSON("/home/vamsidhar/Desktop/consumer/Hashtags");
    }
}
