import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const EvaluationPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [evaluation, setEvaluation] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/evaluations/${id}`)
        .then(response => response.json())
        .then(data => setEvaluation(data));
    }
  }, [id]);

  if (!evaluation) return <p>Loading...</p>;

  return (
    <div>
      <h1>Avaliação ID: {evaluation.id}</h1>
      <h2>{evaluation.title}</h2>
      <p>{evaluation.description}</p>
      <strong>Nota: {evaluation.grade}</strong>
    </div>
  );
};

export default EvaluationPage;
