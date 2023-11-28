export const getStatusColor = (status: string) => {
  if (status === 'Inactive') {
    return 'text-red-600';
  }

  return 'text-green-600';
}
