import { deleteArticle } from '@/redux/features/article/articleThunk';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

export const handleDelete = (id) => {
    const dispatch = useDispatch();
    toast((t) => (
        <div className="flex flex-col gap-3">
            <p className="font-medium">Are you sure you want to delete this article?</p>
            <div className="flex justify-end gap-2">
                <button
                    onClick={() => toast.dismiss(t.id)}
                    className="rounded px-3 py-1 text-sm border"
                >
                    Cancel
                </button>
                <button
                    onClick={() => {
                        dispatch(deleteArticle(id));
                        toast.dismiss(t.id);
                    }}
                    className="rounded bg-red-600 px-3 py-1 text-sm text-white"
                >
                    Delete
                </button>
            </div>
        </div>
    ), {
        duration: Infinity,
    });
};