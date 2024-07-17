import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useUser } from "@clerk/clerk-react";
import { fetchTestHistoryAsync } from "../store/typingSlice";
import { selectTestHistory } from "../store/selectors";
import { FiClock, FiTarget, FiAlertCircle, FiDelete, FiBook, FiFileText } from "react-icons/fi";

const TestHistory = () => {
  const { isSignedIn, user } = useUser();
  const dispatch = useDispatch();
  const { testHistory } = useSelector(selectTestHistory);

  useEffect(() => {
    if (isSignedIn && user) {
      dispatch(fetchTestHistoryAsync(user.primaryEmailAddress.emailAddress));
    }
  }, [isSignedIn, user, dispatch]);

  const memoizedTestHistory = useMemo(() => testHistory, [testHistory]);

  if (!isSignedIn) {
    return (
      <div className="text-center mt-8">
        Please sign in to view your test history.
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Test History</h2>
      {memoizedTestHistory.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">
          No test history available. Complete a test to see your results here.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  WPM
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Accuracy
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Mistakes
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Backspaces
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Lesson
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Text #
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {memoizedTestHistory.map((test, index) => (
                <TestHistoryRow key={index} test={test} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const TestHistoryRow = React.memo(({ test, index }) => (
  <tr
    className={
      index % 2 === 0
        ? "bg-gray-50 dark:bg-gray-800"
        : "bg-white dark:bg-gray-900"
    }
  >
    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
      {new Date(test.date).toLocaleString()}
    </td>
    <td className="px-4 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <FiClock className="text-blue-500 dark:text-blue-400 mr-2" />
        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {test.wpm}
        </span>
      </div>
    </td>
    <td className="px-4 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <FiTarget className="text-green-500 dark:text-green-400 mr-2" />
        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {test.accuracy}%
        </span>
      </div>
    </td>
    <td className="px-4 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <FiAlertCircle className="text-red-500 dark:text-red-400 mr-2" />
        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {test.mistakes}
        </span>
      </div>
    </td>
    <td className="px-4 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <FiDelete className="text-indigo-500 dark:text-indigo-400 mr-2" />
        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {test.backspaces_used}
        </span>
      </div>
    </td>
    <td className="px-4 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <FiBook className="text-purple-500 dark:text-purple-400 mr-2" />
        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {test.lesson_id}
        </span>
      </div>
    </td>
    <td className="px-4 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <FiFileText className="text-yellow-500 dark:text-yellow-400 mr-2" />
        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {test.text_id + 1}
        </span>
      </div>
    </td>
  </tr>
));

export default React.memo(TestHistory);