import React, { forwardRef } from 'react';
import classNames from 'classnames';

export default function PriceInput({
  className,
  leadingAddon,
  leadPadding = 'pl-8',
  trailingAddon,
  trailPadding = 'pr-8',
  ...props
}) {
  return (
    <div className="relative rounded-md shadow-sm">
      {leadingAddon && (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          {leadingAddon}
        </div>
      )}

      <input
        {...props}
        className={classNames(
          'block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
          leadingAddon ? leadPadding : '',
          trailingAddon ? trailPadding : '',
          className
        )}
      />

      {trailingAddon && (
        <div className="absolute inset-y-0 right-0 flex items-center">
          {trailingAddon}
        </div>
      )}
    </div>
  );
}
