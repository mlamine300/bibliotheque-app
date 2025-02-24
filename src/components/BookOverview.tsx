import Image from "next/image";
import { book } from "../../src/index";
import { Button } from "./ui/button";
import BookCover from "./BookCover";

function BookOverview({
  // id,
  title,
  author,
  genre,
  rating,
  total_copies,
  available_copies,
  description,
  color,
  cover,
}: // video,
// summary,
// avaliable,
book) {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-col sm:max-w-[40%]">
        <h1 className="text-light-100 text-6xl my-3">{title}</h1>
        <div className="flex justify-start my-3 text-light-100 text-lg gap-1 md:gap-4">
          <p>
            By&nbsp;{" "}
            <span className="text-primary font-semibold">{author} </span>
          </p>
          <p>
            Category :&nbsp;{" "}
            <span className="text-primary font-semibold">{genre} </span>
          </p>
          <div className="flex items-center">
            <Image src="icons/star.svg" height={20} width={20} alt="star" />{" "}
            &nbsp;
            <span className="text-primary font-semibold">{rating}/5 </span>
          </div>
        </div>
        <div className="flex justify-start my-3 text-light-100 text-lg gap-1 md:gap-4">
          <p>
            Total Books:&nbsp;{" "}
            <span className="text-primary font-semibold">{total_copies}</span>{" "}
          </p>
          <p>
            Available Books:&nbsp;{" "}
            <span className="text-primary font-semibold">
              {available_copies}
            </span>{" "}
          </p>
        </div>
        <p className="my-3 text-light-100 text-justify text-lg">
          {description}
        </p>
        <Button className="bg-primary rounded-md py-4 px-4 hover:bg-secondary">
          <Image src="/icons/book.svg" alt="book" height={20} width={20} />
          <p className="uppercase text-dark-100 font-bebas-neue text-xl font-semibold">
            BORROW BOOK REQUEST
          </p>
        </Button>
      </div>
      <div className="relative flex flex-1 justify-center max-sm:hidden">
        <div className="relative">
          <BookCover coverColor={color} coverUrl={cover} variant="wide" />
        </div>
        <div className="absolute right-16 top-10 opacity-40 rotate-12  max-md:hidden">
          <BookCover coverColor={color} coverUrl={cover} variant="wide" />
        </div>
      </div>
    </div>
  );
}

export default BookOverview;
