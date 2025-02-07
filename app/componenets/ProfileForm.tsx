"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import fetchGithubStats from "../actions/fetchGithubStats";

interface ProfileFormProps {
  handleChange: (val: string) => void; // Define the type of the function prop
  handleGitChange: (val: object) => void; // Define the type of the function prop
  handleFeildChange: (val: object) => void; // Define the type of the function prop
}

const formSchema = z.object({
  // misscelaneous
  fullname: z.string().min(0),
  profileImage: z.any().optional(),
  // data
  email: z.string().email(),
  linkedin: z.string().min(2),
  github: z.string().min(2), // Ensure it's required
  linktreeUsername: z.string().optional(),
  twitterUsername: z.string().optional(),
  instagramUsername: z.string().optional(),
  // coding profiles
  leetcode: z.string().min(2),
  codeforces: z.string().optional(),
  codechefUsername: z.string().optional(),
  gfgUsername: z.string().optional(),
  codingNinjasUsername: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const ProfileForm: React.FC<ProfileFormProps> = ({
  handleChange,
  handleGitChange,
  handleFeildChange,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [fullName, setFullname] = useState<string | null>(null);
  const [gitStats, setgitStats] = useState(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      // data
      email: "",
      linkedin: "",
      github: "", // Ensure it's required
      linktreeUsername: "",
      twitterUsername: "",
      instagramUsername: "",
      // coding profiles
      leetcode: "",
      codeforces: "",
      codechefUsername: "",
      gfgUsername: "",
      codingNinjasUsername: "",
      profileImage: null, // Ensure this is initialized as empty string
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Optional: for image preview
      form.setValue("profileImage", file); // Store the actual file in form state
    }
  };

  const [isGenerating, setIsGenerating] = useState(false);


  const onSubmit = async (values: FormData) => {
    setIsGenerating(true);
    try {
      let imageUrl = uploadedImageUrl;
  
      
      if (values.profileImage) {
        const formData = new FormData();
        formData.append("profileImage", values.profileImage);
  
        const uploadResponse = await fetch("/api/uploadImage", {
          method: "POST",
          body: formData,
        });
  
        const uploadData = await uploadResponse.json();
  
        if (uploadResponse.ok) {
          imageUrl = uploadData.imageUrl;
          setUploadedImageUrl(imageUrl);
        } else {
          console.error("Error uploading image:", uploadData.error);
          return;
        }
      }
  
      
      const requestData = {
        ...values,
        profileImage: imageUrl,
        githubStats: gitStats, 
      };
  
      
      const generateResponse = await fetch("/api/getCodeStats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
  
      const generateData = await generateResponse.json();
  
      if (!generateResponse.ok) {
        console.error("Error generating data:", generateData.error);
      } else {
        handleFeildChange(generateData);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
    finally{
      setIsGenerating(false);
    }
  };
  

  // const githubUsername = form.watch("github");

  return (
    <div
      className="glass-form max-w-md mx-auto h-full border-2 border-[#464d96] p-2  flex flex-col bg-gray-400 rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10
"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-full flex flex-col"
        >
          {/* Image Preview */}
          <div className="flex justify-center py-4">
            <label
              htmlFor="profileImage"
              className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center  cursor-pointer overflow-hidden"
            >
              {uploadedImageUrl ? (
                <img
                  src={uploadedImageUrl}
                  alt="Uploaded Image Preview"
                  className="w-full h-full object-cover"
                />
              ) : imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500 text-sm">Upload Image</span>
              )}
              <Input
                type="file"
                id="profileImage"
                className="hidden"
                {...form.register("profileImage")}
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* Form Fields */}
          <div className="flex-1 overflow-y-auto scrollbar-custom px-4 space-y-6">
            {/* Render the rest of the form fields */}
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">
                    Full Name
                    <span className="text-red-600 text-xl"> *</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your full name"
                      className="border-2  border-[#353A72] focus:border-[#825BE8] focus:outline-none text-[#E0E0E0] placeholder[#252A50]"
                      {...field}
                      onChange={(e) => {
                        let newFullName = e.target.value;

                        // Restrict input to 15 characters
                        if (newFullName.length > 15) {
                          newFullName = newFullName.slice(0, 15); // Cut to 15 characters
                        }

                        const capitalizeWords = (str: string) =>
                          str.replace(/\b\w/g, (char) => char.toUpperCase());

                        setFullname(newFullName);
                        handleChange(capitalizeWords(newFullName)); // If needed, modify this to apply capitalization if necessary
                      }}
                      value={fullName}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Other form fields */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">
                    Email <span className="text-red-600 text-xl"> *</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      className="border-2 border-[#353A72] focus:border-[#825BE8] focus:outline-none text-[#E0E0E0] placeholder[#252A50]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">
                    LinkedIn <span className="text-red-600 text-xl"> *</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your LinkedIn URL"
                      className="border-2 border-[#353A72] focus:border-[#825BE8] focus:outline-none text-[#E0E0E0] placeholder[#252A50]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-end gap-2 justify-between">
              <div className="flex flex-col w-full">
                <FormField
                  control={form.control}
                  name="github"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">
                        GitHub <span className="text-red-600 text-xl"> *</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your GitHub Username"
                          className="border-2 border-[#353A72] focus:border-[#825BE8] focus:outline-none text-[#E0E0E0] placeholder-[#252A50]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Button placed outside FormField */}
              <Button
                type="button"
                className="bg-[#663DD5] hover:bg-[#774ee1] p-2 shine-div"
                onClick={async () => {
                  const githubUsername = form.getValues("github");

                  if (githubUsername) {
                    try {
                      const response = await fetch(
                        `/api/getGitStats?username=${githubUsername}`
                      );
                      const data = await response.json();

                      if (response.ok) {
                        setgitStats(data);
                        handleGitChange(data); // Handle the response here
                      } else {
                        console.error(
                          "Error fetching GitHub stats:",
                          data.error
                        );
                      }
                    } catch (error) {
                      console.error(
                        "Error during fetching GitHub stats:",
                        error
                      );
                    }
                  } else {
                    console.error("GitHub username is required");
                  }
                }}
              >
                <Image
                  src={"/assets/save.svg"}
                  width={16}
                  height={16}
                  alt="gen-image"
                />
              </Button>
            </div>

            <FormField
              control={form.control}
              name="leetcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">
                    Leetcode <span className="text-red-600 text-xl"> *</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your leetcode URL"
                      className="border-2 border-[#353A72] focus:border-[#825BE8] focus:outline-none text-[#E0E0E0] placeholder[#252A50]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="codeforces"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">
                    codeforces
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your codeforces URL"
                      className="border-2 border-[#353A72] focus:border-[#825BE8] focus:outline-none text-[#E0E0E0] placeholder[#252A50]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="codechefUsername"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">
                    Codechef
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      className="border-2 border-[#353A72] focus:border-[#825BE8] focus:outline-none text-[#E0E0E0] placeholder[#252A50]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gfgUsername"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">GFG</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      className="border-2 border-[#353A72] focus:border-[#825BE8] focus:outline-none text-[#E0E0E0] placeholder[#252A50]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="codingNinjasUsername"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">
                    Coding Ninja
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      className="border-2 border-[#353A72] focus:border-[#825BE8] focus:outline-none text-[#E0E0E0] placeholder[#252A50]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="linktreeUsername"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">
                    LinkrTree
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      className="border-2 border-[#353A72] focus:border-[#825BE8] focus:outline-none text-[#E0E0E0] placeholder[#252A50]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="twitterUsername"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">
                    Twitter
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      className="border-2 border-[#353A72] focus:border-[#825BE8] focus:outline-none text-[#E0E0E0] placeholder[#252A50]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instagramUsername"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">
                    Instagram
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      className="border-2 border-[#353A72] focus:border-[#825BE8] focus:outline-none text-[#E0E0E0] placeholder[#252A50]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="px-4 py-2 rounded-2xl">
      <Button
        type="submit"
        disabled={isGenerating}
        className={`w-full p-4 shine-div flex items-center justify-center gap-2
          ${isGenerating ? "bg-gray-400 cursor-not-allowed" : "bg-[#663DD5] hover:bg-[#774ee1]"}
        `}
      >
        {isGenerating ? (
          <>
            <svg
              className="w-6 h-6 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 018 8h-4l3.5 3.5L20 12h-4a8 8 0 01-8 8v-4l-3.5 3.5L4 20v-4a8 8 0 01-8-8h4l-3.5-3.5L4 12H0z"
              ></path>
            </svg>
            <span className="text-lg">Generating...</span>
          </>
        ) : (
          <>
            <Image src={"/assets/aiImage.png"} width={28} height={28} alt="gen-image" />
            <span className="text-lg">Generate</span>
          </>
        )}
      </Button>
    </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;
