const Pagination = ({ page, pagination, handlePageChange, loading }) => {
  return (
    <div className="flex items-center justify-between mt-6">
      <p className="text-sm text-gray-500">
        Showing {pagination.page} of {pagination.countPage}
        {' · '}
        Total {pagination.count}
      </p>

      <div className="flex gap-2">
        <button
          type="button"
          disabled={!pagination.hasPreviousPage || loading}
          onClick={() => handlePageChange(page - 1)}
          className="px-4 py-2 bg-black text-white border border-gray-200 disabled:bg-transparent disabled:text-gray-500 disabled:opacity-50 cursor-pointer"
        >
          Previous
        </button>

        <button
          type="button"
          disabled={!pagination.hasNextPage || loading}
          onClick={() => handlePageChange(page + 1)}
          className="px-4 py-2 bg-black text-white border border-gray-200 disabled:bg-transparent disabled:text-gray-500 disabled:opacity-50 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>

  )
}

export default Pagination;
