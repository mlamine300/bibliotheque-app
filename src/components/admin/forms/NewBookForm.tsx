"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { addBook, updateBook } from "@/lib/actions/book";
import { bookSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import ColorPicker, { Color } from "@rc-component/color-picker";
import "@rc-component/color-picker/assets/index.css";
import FileUpload from "@/components/FileUpload";
const defaultValues: z.infer<typeof bookSchema> = {
  // id: "",
  title: "",
  author: "",
  genre: "",
  rating: 0,
  total_copies: 0,
  //available_copies: 0,
  description: "",
  //   "",
  color: "",
  cover: "dfsdfsdf",
  video: "sdfsdfdsf",
  summary: "",
};
function NewBookForm({ values }: { values?: z.infer<typeof bookSchema> }) {
  const isForUpdating = Boolean(values);
  const { toast } = useToast();
  const [pending, setPending] = useState<boolean>(false);
  const router = useRouter();
  const [color, setColor] = useState<Color>(new Color(values?.color || ""));
  const bookForm = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: values || defaultValues,
  });
  const submit = async (values: z.infer<typeof bookSchema>) => {
    setPending(true);

    const { success, error, data } = isForUpdating
      ? await updateBook({ ...values, id: values.id || "" })
      : await addBook(values);
    if (!success) {
      toast({ title: "Error", description: error, variant: "destructive" });
    } else {
      console.log(data);
      toast({ title: "success", description: error });
      router.push(`/admin/books/${data?.books[0].id}`);
    }
    setPending(false);
  };

  return (
    <Form {...bookForm}>
      <form
        onSubmit={bookForm.handleSubmit(submit)}
        className="max-w-[800px] w-[90%] flex flex-col gap-6 mt-10 "
      >
        <FormField
          control={bookForm.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg my-4 text-dark-100">
                Book Title
              </FormLabel>
              <FormControl>
                <Input
                  className="py-6 text-lg placeholder:text-light-500"
                  placeholder="Enter the book title"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={bookForm.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg my-4 text-dark-100">
                Author
              </FormLabel>
              <FormControl>
                <Input
                  className="py-6 text-lg placeholder:text-light-500"
                  placeholder="Enter the Author name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={bookForm.control}
          name="genre"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg my-4 text-dark-100">
                Genre
              </FormLabel>
              <FormControl>
                <Input
                  className="py-6 text-lg placeholder:text-light-500"
                  placeholder="Enter the Genre of the book"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={bookForm.control}
          name="total_copies"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg my-4 text-dark-100">
                Total number of books
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  className="py-6 text-lg placeholder:text-light-500"
                  placeholder="Enter the total number of books"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={bookForm.control}
          name="cover"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg my-4 text-dark-100">
                Book Cover
              </FormLabel>
              <FormControl>
                <FileUpload
                  defaultFilePath={values?.cover || undefined}
                  type="image"
                  folder="/books/img"
                  variant="light"
                  placeHolder="Uplaod book cover"
                  onFileChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={bookForm.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg my-4 text-dark-100">
                Cover color
              </FormLabel>
              <FormControl>
                <div className="flex flex-col items-center">
                  <ColorPicker
                    onChange={(color) => {
                      field.onChange(color.toHexString());
                      setColor(new Color(color));
                    }}
                    value={field.value}
                  />

                  <p>{color.toHexString()} </p>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={bookForm.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg my-4 text-dark-100">
                Book Description
              </FormLabel>
              <FormControl>
                <Textarea
                  className="py-6 text-lg placeholder:text-light-500"
                  placeholder="Write the description of the book"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={bookForm.control}
          name="video"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg my-4 text-dark-100">
                Book trailer
              </FormLabel>
              <FormControl>
                <FileUpload
                  defaultFilePath={values?.video || undefined}
                  type="video"
                  folder="/books/videos"
                  variant="light"
                  placeHolder="Uplaod book trailer"
                  onFileChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={bookForm.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg my-4 text-dark-100">
                Book Summary
              </FormLabel>
              <FormControl>
                <Textarea
                  className="py-6 text-lg placeholder:text-light-500 h-60"
                  placeholder="Write a brief summary of the book"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button size="lg" variant="admin" disabled={pending}>
          {pending
            ? "Uploading"
            : isForUpdating
            ? "Update Book"
            : "Add new Book"}
        </Button>
      </form>
    </Form>
  );
}

export default NewBookForm;
