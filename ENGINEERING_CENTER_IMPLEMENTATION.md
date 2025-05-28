# Engineering Center Selection Implementation

## Overview
This implementation adds Engineering Center selection functionality to the dashboard, allowing users to filter data by Engineering_center field and view station-specific data for each engineering center.

## Changes Made

### 1. Updated MainStationsContent.tsx
- Added `engineeringCenter` prop interface
- Modified all 4 API queries to include Engineering_center filtering:
  - `cisco_sw_join_eng_center`
  - `daily_reporter`
  - `ird_harmonic_join_eng_center`
  - `tx_control_with_eng_center`
- Updated query keys to include `engineeringCenter` parameter
- Added conditional filtering logic for Engineering_center field

### 2. Updated AdditionStationsContent.tsx
- Added `engineeringCenter` prop interface
- Modified all 4 API queries to include Engineering_center filtering
- Updated query keys to include `engineeringCenter` parameter
- Added conditional filtering logic for Engineering_center field

### 3. Created EngineeringCenterContent.tsx
- New component that manages station display for a specific Engineering Center
- Fetches station counts for the engineering center
- Renders both Main and Addition station sections with proper counts
- Includes empty state handling when no stations are found

### 4. Created useEngineeringCenters.ts Hook
- Custom hook that fetches all unique Engineering Centers from the API
- Groups stations by Engineering_center field
- Calculates Main and Addition station counts for each center
- Returns formatted data structure for tabs
- Includes location mapping from station facility data

### 5. Updated Index.tsx
- Replaced hardcoded regional stations with dynamic Engineering Centers
- Added loading state for Engineering Center data fetching
- Modified tab structure to use Engineering Center names
- Updated content rendering to use EngineeringCenterContent component
- Maintained "ALL" tab for viewing all stations across all centers

## API Queries Structure

Each Engineering Center now filters the following API endpoints:

1. **cisco_sw_join_eng_center** - NT Link status data
2. **daily_reporter** - Daily operational data (PEA, Downtime, SFN, Emission)
3. **ird_harmonic_join_eng_center** - Satellite link data (IRD status)
4. **tx_control_with_eng_center** - Transmitter control data (Power, IMD, MER)

## Filtering Logic

### Station Type Filtering (Existing)
- Main Stations: `Station_Type === "M"`
- Addition Stations: `Station_Type !== "M"`

### Engineering Center Filtering (New)
- When `engineeringCenter` prop is provided: `Engineering_center === engineeringCenter`
- When no `engineeringCenter` prop: Shows all stations (existing behavior)

## Tab Structure

```
ALL - Shows all Main and Addition stations across all Engineering Centers
[Engineering Center 1] - Shows stations specific to this center
[Engineering Center 2] - Shows stations specific to this center
...
[Engineering Center N] - Shows stations specific to this center
```

## Features

1. **Dynamic Tab Generation**: Tabs are generated based on actual Engineering Centers found in the API data
2. **Station Count Display**: Each Engineering Center shows accurate counts for Main and Addition stations
3. **Real-time Updates**: All queries refresh every 10-30 seconds to maintain current data
4. **Empty State Handling**: Graceful handling when no stations exist for an Engineering Center
5. **Loading States**: Proper loading indicators during data fetching
6. **Backward Compatibility**: "ALL" tab maintains original functionality

## Technical Implementation

- Uses React Query for efficient data fetching and caching
- Implements proper TypeScript interfaces for type safety
- Follows existing component patterns and styling
- Maintains all existing chart components and functionality
- Preserves all existing filtering logic for Station_Type

## Benefits

1. **Centralized View**: Users can view all stations or focus on specific Engineering Centers
2. **Improved Organization**: Data is logically grouped by Engineering Center
3. **Performance**: Only loads data relevant to the selected Engineering Center
4. **Scalability**: Automatically adapts to new Engineering Centers added to the system
5. **Consistency**: Maintains all existing dashboard functionality while adding new filtering capabilities

## Usage

1. Application loads and fetches all Engineering Centers
2. User sees tabs for "ALL" plus each Engineering Center
3. Clicking "ALL" shows traditional view with all stations
4. Clicking an Engineering Center tab shows only stations for that center
5. All charts and metrics are filtered accordingly
6. Data refreshes automatically to stay current
