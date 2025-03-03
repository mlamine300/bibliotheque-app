import BookCover from "@/components/BookCover";
import ProfileImage from "@/components/ProfileImage";
import { borrowedBook } from "@/index";
import dayjs from "dayjs";
import { GoDotFill } from "react-icons/go";
import { HiCalendar } from "react-icons/hi2";

const DashBoardBorrowedBookRow = ({
  borrowedBook,
}: {
  borrowedBook: borrowedBook;
}) => {
  const { book, user } = borrowedBook;
  const borrowDate = dayjs(borrowedBook.borrowedDate).format("DD/MM/YY");
  return (
    <div className="flex gap-4 items-center p-4 rounded-xl bg-light-300">
      <BookCover
        coverUrl={book.cover as string}
        coverColor={book.color}
        className="w-12 h-16 mr-4"
      />
      <div className="flex flex-col gap- font-ibm-plex-sans">
        <h3 className="font-semibold text-base">{book.title} </h3>
        <div className="flex text-sm font-normal items-center">
          <p>{`By ${book.author}`}</p>
          <GoDotFill className="w-1 h-1 self-center" />
          <p>{book.genre} </p>
        </div>
        <div className="flex gap-3 items-center">
          <div className="flex items-center">
            <ProfileImage
              img={user.userAvatar as string}
              width={18}
              height={18}
              className="w-[18px] h-[18px]"
            />
            <p className="font-normal text-xs text-gray-500 ">
              {user.fullName}{" "}
            </p>
          </div>
          <HiCalendar className="w-4 h-4" />
          <p className="text-xs font-normal">{borrowDate} </p>
        </div>
      </div>
    </div>
  );
};

export default DashBoardBorrowedBookRow;
