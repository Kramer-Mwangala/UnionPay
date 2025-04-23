"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

interface MembershipChartProps {
  timeRange: string
  chartType: "growth" | "registrationTrend" | "demographics" | "statusDistribution"
}

export function MembershipChart({ timeRange, chartType }: MembershipChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Generate data based on chart type and time range
    let data
    let options
    let type: "line" | "bar" | "pie" | "doughnut" = "line"

    // Generate different chart data based on the chart type
    switch (chartType) {
      case "growth":
        type = "line"
        data = {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: "New Members",
              data: [12, 19, 15, 20, 25, 30],
              borderColor: "rgb(59, 130, 246)",
              backgroundColor: "rgba(59, 130, 246, 0.5)",
              tension: 0.3,
            },
            {
              label: "Total Members",
              data: [50, 62, 77, 92, 112, 137],
              borderColor: "rgb(16, 185, 129)",
              backgroundColor: "rgba(16, 185, 129, 0.5)",
              tension: 0.3,
            },
          ],
        }
        options = {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }
        break
      case "registrationTrend":
        type = "line"
        data = {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: "Registrations",
              data: [12, 19, 15, 20, 25, 30, 28, 32, 35, 40, 38, 42],
              borderColor: "rgb(59, 130, 246)",
              backgroundColor: "rgba(59, 130, 246, 0.5)",
              tension: 0.3,
            },
          ],
        }
        options = {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }
        break
      case "demographics":
        type = "bar"
        data = {
          labels: ["18-24", "25-34", "35-44", "45-54", "55+"],
          datasets: [
            {
              label: "Male",
              data: [15, 30, 25, 18, 12],
              backgroundColor: "rgba(59, 130, 246, 0.7)",
            },
            {
              label: "Female",
              data: [10, 25, 20, 15, 8],
              backgroundColor: "rgba(236, 72, 153, 0.7)",
            },
          ],
        }
        options = {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }
        break
      case "statusDistribution":
        type = "doughnut"
        data = {
          labels: ["Active", "Pending", "Inactive"],
          datasets: [
            {
              data: [70, 15, 15],
              backgroundColor: ["rgba(16, 185, 129, 0.7)", "rgba(245, 158, 11, 0.7)", "rgba(239, 68, 68, 0.7)"],
              borderWidth: 1,
            },
          ],
        }
        options = {
          responsive: true,
          maintainAspectRatio: false,
        }
        break
    }

    // Create new chart
    chartInstance.current = new Chart(ctx, {
      type,
      data,
      options,
    })

    // Cleanup on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [timeRange, chartType])

  return <canvas ref={chartRef} />
}
