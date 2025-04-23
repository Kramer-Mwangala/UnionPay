"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

interface JobsChartProps {
  timeRange: string
  chartType: "placementRate" | "trends" | "categories" | "successRate"
}

export function JobsChart({ timeRange, chartType }: JobsChartProps) {
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
      case "placementRate":
        type = "doughnut"
        data = {
          labels: ["Placed", "In Process", "Not Placed"],
          datasets: [
            {
              data: [60, 25, 15],
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
      case "trends":
        type = "line"
        data = {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: "Job Postings",
              data: [8, 12, 10, 15, 18, 20, 22, 25, 23, 28, 30, 35],
              borderColor: "rgb(16, 185, 129)",
              backgroundColor: "rgba(16, 185, 129, 0.5)",
              tension: 0.3,
            },
            {
              label: "Applications",
              data: [20, 35, 30, 45, 55, 60, 65, 75, 70, 85, 90, 105],
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
      case "categories":
        type = "bar"
        data = {
          labels: ["Construction", "Electrical", "Plumbing", "Carpentry", "Masonry", "Other"],
          datasets: [
            {
              label: "Job Postings by Category",
              data: [35, 20, 15, 12, 10, 8],
              backgroundColor: [
                "rgba(59, 130, 246, 0.7)",
                "rgba(16, 185, 129, 0.7)",
                "rgba(245, 158, 11, 0.7)",
                "rgba(236, 72, 153, 0.7)",
                "rgba(139, 92, 246, 0.7)",
                "rgba(107, 114, 128, 0.7)",
              ],
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
      case "successRate":
        type = "bar"
        data = {
          labels: ["Construction", "Electrical", "Plumbing", "Carpentry", "Masonry"],
          datasets: [
            {
              label: "Application Success Rate (%)",
              data: [65, 70, 60, 75, 55],
              backgroundColor: "rgba(16, 185, 129, 0.7)",
            },
          ],
        }
        options = {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              ticks: {
                callback: (value) => value + "%",
              },
            },
          },
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
