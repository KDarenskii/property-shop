import React from "react";
import { useNavigate } from "react-router-dom";
import { NOTION_TYPES } from "../../constants/notionTypes";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { deleteBid } from "../../store/bids/thunks/deleteBid";
import { showNotion } from "../../utils/showNotion";
import ActionButton from "../Buttons/ActionButton";

type DeleteBidButtonProps = {
    id: string;
};

const DeleteBidButton: React.FC<DeleteBidButtonProps> = ({ id }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleDeleteBid = () => {
        setIsSubmitting(true);

        dispatch(deleteBid(id))
            .unwrap()
            .then((response) => {
                showNotion(NOTION_TYPES.SUCCESS, response.message);
                navigate(-1);
            })
            .catch((error) => showNotion(NOTION_TYPES.ERROR, error.message))
            .finally(() => setIsSubmitting(false));
    };

    return (
        <ActionButton
            onClick={handleDeleteBid}
            color={"red"}
            text={"Удалить"}
            disabled={isSubmitting}
        />
    );
};

export default DeleteBidButton;
