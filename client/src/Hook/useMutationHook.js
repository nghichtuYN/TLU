import { useQuery, useMutation } from "@tanstack/react-query";
export const useMutationHook = (fnCallBack, fnSucces,fnError) => {
  const mutation = useMutation({
    mutationFn: fnCallBack,
    onSuccess: fnSucces,
    onError:fnError
  });
  return mutation;
};
export const useQueryHook = (key, fnCallBack) => {
  const query = useQuery({ queryKey: [...key], queryFn: fnCallBack });
  return query;
};
