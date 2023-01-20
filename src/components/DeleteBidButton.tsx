import React from "react";
import { useNavigate } from "react-router-dom";
import { NOTION_TYPES } from "../constants/notionTypes";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { deleteBid } from "../store/bids/thunks/deleteBid";

type DeleteButtonProps = {
    id: string;
};

const DeleteBidButton: React.FC<DeleteButtonProps> = ({ id }) => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleDeleteBid = () => {
        
        if (isSubmitting) return;
        setIsSubmitting(true);

        dispatch(deleteBid(id)).unwrap()
            .then((response) => {
                showNotion(NOTION_TYPES.SUCCESS, response.message);
                navigate(-1);
            })
            .catch((error) => showNotion(NOTION_TYPES.ERROR, error.message))
            .finally(() => setIsSubmitting(false));
    };

    return (
        <button 
            onClick={handleDeleteBid} 
            className="button-action button-action--red"
            disabled={isSubmitting}
        >
            Удалить
        </button>
    );
};

export default DeleteBidButton;
function showNotion(SUCCESS: string, message: string) {
    throw new Error("Function not implemented.");
}

